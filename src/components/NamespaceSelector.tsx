
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Mock data for namespaces
const namespaces = [
  { value: "all", label: "All Namespaces" },
  { value: "default", label: "default" },
  { value: "kube-system", label: "kube-system" },
  { value: "kube-public", label: "kube-public" },
  { value: "kube-node-lease", label: "kube-node-lease" },
  { value: "web", label: "web" },
  { value: "api", label: "api" },
  { value: "database", label: "database" },
  { value: "monitoring", label: "monitoring" },
  { value: "batch", label: "batch" },
  { value: "testing", label: "testing" },
];

interface NamespaceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const NamespaceSelector: React.FC<NamespaceSelectorProps> = ({
  value,
  onChange
}) => {
  const [open, setOpen] = React.useState(false);

  const selectedNamespace = namespaces.find((namespace) => namespace.value === value);

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[240px] justify-between font-normal"
          >
            {selectedNamespace?.label || "Select namespace"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command>
            <CommandInput placeholder="Search namespace..." />
            <CommandEmpty>No namespace found.</CommandEmpty>
            <CommandGroup>
              {namespaces.map((namespace) => (
                <CommandItem
                  key={namespace.value}
                  value={namespace.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === namespace.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {namespace.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NamespaceSelector;
