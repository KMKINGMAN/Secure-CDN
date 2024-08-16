"use client";
import { useContext } from 'react';
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Heading } from "@radix-ui/themes";
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { buttonVariants } from "@/components/ui/button";

export default function Nav() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/logout');
    };

    const site_pages = [
        { title: "Home", description: "The main page", href: "/" },
        { title: "Contact", description: "To get in touch with dev", href: "/contact" },
        { title: "About", description: "Brief overview of website, mission, and team.", href: "/about" }
    ];
    if (isLoggedIn) {
        site_pages.push(
            { title: "Dashboard", description: "Start using our services", href: "/dashboard" },
            { title: "Settings", description: "Edit's your profile", href: "/settings" }
        );
    }

    const our_data = [
        { title: "KMCoders", description: "The offical KMCoders Discord Server", href: "https://discord.gg/TnWD6492dB" },
        { title: "Telegram", description: "The offical Telegram Channel", href: "https://t.me/kmcoders" },
    ];

    return (
        <div className="tw-flex tw-justify-between tw-items-center tw-p-4">
            <Link href="/">
                <Heading as='h4'>KMCoders CDN</Heading>
            </Link>
            <NavOptions site_pages={site_pages} our_data={our_data} />

            <div className="tw-flex tw-items-center tw-space-x-4">
            {
                isLoggedIn ? 
                (<Link href={'/'} onClick={handleLogout} className={buttonVariants({ variant: "outline" })}>
                    Logout
                </Link>):
                (<Link href="/login" className={buttonVariants({ variant: "outline" })}>
                    Login
                </Link> ) 
            }
            </div>
        </div>
    );
}

export function NavOptions({ site_pages, our_data }) {
    return (
        <NavigationMenu>
            <NavigationMenuList className="tw-flex tw-space-x-4">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:tw-text-gray-400">Site Content</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="tw-grid tw-w-[400px] tw-gap-3 tw-p-4 md:tw-w-[500px] md:tw-grid-cols-2 lg:tw-w-[600px]">
                            {site_pages.map((component) => (
                                component.href ? (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ) : null
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:tw-text-gray-400">Developers</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="tw-grid tw-w-[400px] tw-gap-3 tw-p-4 md:tw-w-[500px] md:tw-grid-cols-2 lg:tw-w-[600px]">
                            {our_data.map((component) => (
                                component.href ? (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ) : null
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={`tw-block tw-select-none tw-space-y-1 tw-rounded-md tw-p-3 tw-leading-none tw-no-underline tw-outline-none tw-transition-colors hover:tw-bg-gray-700 hover:tw-text-white focus:tw-bg-gray-700 focus:tw-text-white ${className}`}
                    {...props}
                >
                    <div className="tw-text-sm tw-font-medium tw-leading-none">{title}</div>
                    <p className="tw-line-clamp-2 tw-text-sm tw-leading-snug tw-text-gray-400">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
