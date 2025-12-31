'use client';

import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
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
import { Check, ChevronsUpDown, TrendingUp, Shield, Building2, Heart, DollarSign, Zap, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon mapping for different field types
const getFieldIcon = (fieldName: string, value?: string) => {
    if (fieldName === 'investmentGoals') {
        const goalIcons: Record<string, React.ReactNode> = {
            'Growth': <TrendingUp className="h-4 w-4 text-yellow-500" />,
            'Income': <DollarSign className="h-4 w-4 text-green-500" />,
            'Balanced': <Shield className="h-4 w-4 text-blue-500" />,
            'Conservative': <Shield className="h-4 w-4 text-gray-400" />,
        };
        return goalIcons[value || ''] || <TrendingUp className="h-4 w-4 text-yellow-500" />;
    }
    if (fieldName === 'riskTolerance') {
        const riskColors: Record<string, string> = {
            'Low': 'text-green-500',
            'Medium': 'text-yellow-500',
            'High': 'text-red-500',
        };
        return <Shield className={cn("h-4 w-4", riskColors[value || ''] || "text-gray-400")} />;
    }
    if (fieldName === 'preferredIndustry') {
        const industryIcons: Record<string, React.ReactNode> = {
            'Technology': <Zap className="h-4 w-4 text-blue-500" />,
            'Healthcare': <Heart className="h-4 w-4 text-red-500" />,
            'Finance': <DollarSign className="h-4 w-4 text-green-500" />,
            'Energy': <Zap className="h-4 w-4 text-yellow-500" />,
            'Consumer Goods': <ShoppingBag className="h-4 w-4 text-purple-500" />,
        };
        return industryIcons[value || ''] || <Building2 className="h-4 w-4 text-blue-500" />;
    }
    return null;
};

const SelectField = ({ name, label, placeholder, options, control, error, required = false }: SelectFieldProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">{label}</Label>

            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => {
                    const validValue = field.value && options.some(opt => opt.value === field.value) 
                        ? field.value 
                        : undefined;
                    
                    const selectedOption = options.find(opt => opt.value === validValue);

                    return (
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-between select-trigger",
                                        !validValue && "text-gray-500"
                                    )}
                                >
                                    {selectedOption ? (
                                        <span className="flex items-center gap-2">
                                            {getFieldIcon(name, selectedOption.value)}
                                            <span>{selectedOption.label}</span>
                                        </span>
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0" align="start">
                                <Command>
                                    <CommandInput placeholder={`Search ${label.toLowerCase()}...`} className="country-select-input" />
                                    <CommandList className="max-h-[250px] overflow-y-auto country-select-scrollbar">
                                        <CommandEmpty>No option found.</CommandEmpty>
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    onSelect={() => {
                                                        field.onChange(option.value);
                                                        setOpen(false);
                                                    }}
                                                    className="country-select-item"
                                                >
                                                    <span className="mr-2">
                                                        {getFieldIcon(name, option.value)}
                                                    </span>
                                                    <span>{option.label}</span>
                                                    {validValue === option.value && (
                                                        <Check className="ml-auto h-4 w-4" />
                                                    )}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    );
                }}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};

export default SelectField;