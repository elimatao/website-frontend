import {Button} from "@/components/ui/button"
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="text-center p-4">
            <Button variant={"default"} className="text-sm font-mono mt-1.5">This is a button</Button>
            <Button variant={"link"} className="test-sm">This is a Link Button</Button>
            <Link href={"/"}>asdf</Link>
        </footer>
    );
}