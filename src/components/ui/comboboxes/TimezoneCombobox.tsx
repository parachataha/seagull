"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { TIMEZONES, TimezoneType } from "@/lib/data/timezones"

export function TimezoneCombobox({
    value,
    setValue
} : {
    value: string,
    setValue: (arg: string) => void
}) {

    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")

    const [options, setOptions] = React.useState<TimezoneType[]>([
        ...TIMEZONES,
    ])

    return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
        >
            {value
                ? TIMEZONES.find((timezone) => timezone.abbr.trim().toLowerCase() === value.trim().toLowerCase())?.abbr || "None"
                : "Select timezone"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
        <Command>
            <CommandInput
            value={search}
            onValueChange={(currentValue) => {

                const search = currentValue.trim().toLowerCase();
                setSearch(currentValue)

                if (currentValue.trim().length > 1) {
                    setOptions( 
                        TIMEZONES.filter((timezone) => 
                            timezone.abbr.toLowerCase().includes(search) ||
                            timezone.name.toLowerCase().includes(search) 
                        )
                    )
                } else {
                    // RESET OPTIONS
                    setOptions( [...TIMEZONES] )
                }
            }}
            placeholder="Search by abbreviation or name..."
            className="h-9"
            />
            <CommandList className="h-49 overflow-auto w-full">
            <CommandEmpty>Please enter a valid timezone</CommandEmpty>
            <CommandGroup>
                {options.map((timezone) => (
                    <CommandItem
                    key={timezone.abbr + timezone.name}
                    value={`${timezone.abbr} ${timezone.name}`}
                    onSelect={() => {
                        setValue(timezone.abbr)
                        setOpen(false)
                    }}
                    >
                    {timezone.abbr && `${timezone.abbr} - `} {timezone.name}
                    <Check
                        className={cn(
                            "ml-auto h-4 w-4",
                            value === timezone.abbr ? "opacity-100" : "opacity-0"
                        )}
                    />
                    </CommandItem>
                ))}
            </CommandGroup>
            </CommandList>
        </Command>
        </PopoverContent>
    </Popover>
    )
}
