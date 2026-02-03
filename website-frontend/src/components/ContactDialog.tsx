import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ContactLinks from "./ContactLinks";
import { useTranslations } from "next-intl";

export default function ContactDialog() {
    const t = useTranslations('Navigation');
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    size="sm">
                    {t('contact')}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="">
                <ContactLinks />
            </PopoverContent>
        </Popover>
    )
}