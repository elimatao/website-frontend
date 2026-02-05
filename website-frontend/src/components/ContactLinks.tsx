import { Github, Youtube } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from '@/i18n/routing'
import CopyMailButton from './CopyMailButton'
export default function ContactLinks() {
    return (
        <div className="flex justify-around gap-2">
            <CopyMailButton encodedEmail="aW5mby5lbGlhQGRvdW1lcmMubWU="/>
            <Button asChild size="icon" variant="outline" className="hover:cursor-pointer">
                <Link href="https://github.com/elimatao" target="_blank">
                    <Github />
                </Link>
            </Button>
            <Button asChild size="icon" variant="outline" className="hover:cursor-pointer">
                <Link href="https://www.youtube.com/@EliaDoumerc" target="_blank" aria-label="YouTube">
                    <Youtube />
                </Link>
            </Button>
        </div>
    )
}