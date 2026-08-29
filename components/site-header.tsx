"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement"><span>Complimentary delivery over ₹1,999 · 15-day easy returns</span></div>
      <header className="site-header">
        <div className="header-row container-wide">
          <button ref={menuButtonRef} className="header-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}<span>Menu</span>
          </button>
          <Logo />
          <nav className="primary-nav" aria-label="Primary navigation">
            {links.map((link) => {
              const activeCategory = searchParams.get("category");
              const active = link.href === "/lookbook"
                ? pathname === link.href
                : pathname === "/shop" && (link.label === "New in" ? !activeCategory : activeCategory === link.label);
              return <Link key={link.label} href={link.href} aria-current={active ? "page" : undefined}>{link.label}</Link>;
            })}
          </nav>
          <div className="header-actions">
            <button className="header-action" type="button" aria-label="Search products" onClick={() => setSearchOpen(true)}><SearchIcon /></button>
            <button className="header-action theme-toggle" type="button" aria-label={`Use ${theme === "light" ? "dark" : "light"} theme`} onClick={toggleTheme}>
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            <Link className="header-action header-account" href="/login" aria-label={user ? `Account for ${user.name}` : "Profile"}><UserIcon /><span>{user?.name.split(" ")[0] ?? "Profile"}</span></Link>
            <Link className="header-action header-badge" href="/wishlist" aria-label={`Wishlist with ${wishlist.length} items`}><HeartIcon /><span>{wishlist.length}</span></Link>
            <Link className="header-action header-badge" href="/cart" aria-label={`Shopping bag with ${cartCount} items`}><BagIcon /><span>{cartCount}</span></Link>
          </div>
        </div>
        <div id="mobile-navigation" className={`mobile-nav${menuOpen ? " mobile-nav--open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
          <nav aria-label="Mobile navigation">
            {links.map((link) => <Link key={link.label} href={link.href}><span>{link.label}</span><span>↗</span></Link>)}
            <Link href="/shop?category=Fandom%20Edit"><span>Graphic edit</span><span>↗</span></Link>
          </nav>
          <div className="mobile-nav__utilities">
            <button type="button" onClick={() => setSearchOpen(true)}><SearchIcon />Search the store</button>
            <Link href="/login"><UserIcon />{user ? `Hi, ${user.name}` : "Log in or create an account"}</Link>
            {user && <button type="button" onClick={logout}>Log out</button>}
            <button type="button" onClick={toggleTheme}>{theme === "light" ? <MoonIcon /> : <SunIcon />}{theme === "light" ? "Dark mode" : "Light mode"}</button>
          </div>
        </div>
      </header>
      <SearchDrawer open={searchOpen} onClose={closeSearch} />
    </>
  );
}