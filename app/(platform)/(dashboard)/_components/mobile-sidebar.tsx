"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"; 

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SideBar } from "./sidebar";

export const MobileSidebar = () => {
    const pathName = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const onOpen =  useMobileSidebar((state) => state.onOpen);
    const onClose =  useMobileSidebar((state) => state.onClose);
    const isOpen =  useMobileSidebar((state) => state.isOpen);

    useEffect(() => {
        onClose();
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, [pathName, onClose]);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <Button
                onClick={onOpen}
                className="block md:hidden mr-2"
                variant="ghost"
                size="sm"
            >
                <Menu className="h-4 w-4"/>
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side="left"
                    className="p-2 pt-10"
                >
                    <SideBar 
                    storagekey="t-sidebar-mobile-state" 
                    />
                </SheetContent>
            </Sheet>
        </>
    );
};  