import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ContactLinks from "./ContactLinks";
import { useTranslations } from "next-intl";

export default function ContactDialog() {
    const t = useTranslations('Navigation');
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    size="sm">
                    {t('contact')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-center">{t('contact_me')}</DialogTitle>
                </DialogHeader>
                <ContactLinks />
            </DialogContent>
        </Dialog>
    )
}