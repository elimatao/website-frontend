import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ContactLinks from "./ContactLinks";

export default function ContactDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    size="sm">
                    Contact
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-center">Contact Me!</DialogTitle>
                </DialogHeader>
                <ContactLinks />
            </DialogContent>
        </Dialog>
    )
}