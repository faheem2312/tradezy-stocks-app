/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';

type CountrySelectProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
};

const CountrySelect = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const countries = countryList().getData(); // Get country data

    // Find the selected country object
    const selectedCountry = countries.find((country) => country.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-between select-trigger",
                        !selectedCountry && "text-gray-500"
                    )}
                >
                    {selectedCountry ? (
                        <span className="flex items-center gap-2">
                            <ReactCountryFlag
                                countryCode={selectedCountry.value}
                                svg
                                style={{
                                    width: '1.5em',
                                    height: '1.5em',
                                }}
                                title={selectedCountry.label}
                            />
                            <span>{selectedCountry.label}</span>
                        </span>
                    ) : (
                        "Select a country"
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList className="max-h-[300px] overflow-y-auto country-select-scrollbar">
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {countries.map((country) => (
                                <CommandItem key={country.value} onSelect={() => { onChange(country.value); setOpen(false); }}>
                                    <ReactCountryFlag
                                        countryCode={country.value}
                                        svg
                                        style={{
                                            width: '1.5em',
                                            height: '1.5em',
                                            marginRight: '0.5rem',
                                        }}
                                        title={country.label}
                                    />
                                    <span>{country.label}</span>
                                    {value === country.value && <Check className="ml-auto h-4 w-4" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
export const CountrySelectField = ({
                                       name,
                                       label,
                                       control,
                                       error,
                                       required = false,
                                   }: CountrySelectProps) => {
    return (
        <div className='space-y-2'>
            <Label htmlFor={name} className='form-label'>
                {label}
            </Label>
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <CountrySelect value={field.value} onChange={field.onChange} />
                )}
            />
            {error && <p className='text-sm text-red-500'>{error.message}</p>}
            <p className='text-xs text-gray-500'>
                Helps us show market data and news relevant to you.
            </p>
        </div>
    );
};