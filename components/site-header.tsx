"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon, UserIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { SearchDrawer } from "@/components/search-drawer";
import { useStore } from "@/components/providers";

const links = [
  { href: "/shop", label: "New in" },
  { href: "/shop?category=Women", label: "Women" },
  { href: "/shop?category=Men", label: "Men" },
  { href: "/shop?category=Unisex", label: "Unisex" },
  { href: "/shop?category=Kids", label: "Kids" },
  { href: "/lookbook", label: "Lookbook" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartCount, wishlist, user, logout, theme, toggleTheme } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement">
        <span>Free delivery above ₹1,999</span><span aria-hidden="true">•</span><span>Easy 15-day returns</span>
      </div>
      <header className="site-header">
        <div className="header-row container-wide">
          <button className="header-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}<span>Menu</span>
          </button>
          <Logo />
          <nav className="primary-nav" aria-label="Primary navigation">
            {links.map((link) => {
              const activeCategory = searchParams.get("category");
              const active = link.href === "/lookbook"
                ? pathname === "/lookbook"
                : pathname === "/shop" && (link.label === "New in" ? !activeCategory : activeCategory === link.label);
              return <Link key={link.label} href={link.href} aria-current={active ? "page" : undefined}>{link.label}</Link>;
            })}
          </nav>
          <div className="header-actions">
            <button className="header-action" type="button" aria-label="Search products" onClick={() => setSearchOpen(true)}><SearchIcon /></button>
            <button className="header-action theme-toggle" type="button" aria-label={`Use ${theme === "light" ? "dark" : "light"} theme`} onClick={toggleTheme}>
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            <Link className="header-action header-account" href="/login" aria-label={user ? `Account for ${user.name}` : "Log in"}>
              <UserIcon /><span>{user?.name.split(" ")[0] ?? "Log in"}</span>
            </Link>
            <Link className="header-action header-badge" href="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}><HeartIcon /><span>{wishlist.length}</span></Link>
            <Link className="header-action header-badge" href="/cart" aria-label={`Shopping bag with ${cartCount} items`}><BagIcon /><span>{cartCount}</span></Link>
          </div>
        </div>
        <div id="mobile-navigation" className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`}>
          <nav aria-label="Mobile navigation">
            {links.map((link) => <Link key={link.label} href={link.href}>{link.label}<span>↗</span></Link>)}
            <Link href="/shop?category=Babies">Babies<span>↗</span></Link>
          </nav>
          <div className="mobile-nav__utilities">
            <Link href="/login"><UserIcon />{user ? `Hi, ${user.name}` : "Log in or create an account"}</Link>
            {user && <button type="button" onClick={logout}>Log out</button>}
            <button type="button" onClick={() => setSearchOpen(true)}><SearchIcon />Search the store</button>
            <button type="button" onClick={toggleTheme}>{theme === "light" ? <MoonIcon /> : <SunIcon />}{theme === "light" ? "Switch to dark mode" : "Switch to light mode"}</button>
          </div>
        </div>
      </header>
      <SearchDrawer open={searchOpen} onClose={closeSearch} />
    </>
  );
}
