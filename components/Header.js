"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Logo from "./Logo";
import CartLink from "./CartLink";
import { getServicesByPlatform, platformMeta } from "@/lib/services";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const platformMenus = useRef([]);

  function closeNavigation() {
    setMenuOpen(false);
    platformMenus.current.forEach((menu) => menu?.removeAttribute("open"));
  }

  function keepOnePlatformOpen(currentMenu) {
    if (!currentMenu.open) return;
    platformMenus.current.forEach((menu) => {
      if (menu && menu !== currentMenu) menu.removeAttribute("open");
    });
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          {Object.keys(platformMeta).map((platformKey, index) => {
            const platform = platformMeta[platformKey];
            const platformServices = getServicesByPlatform(platformKey);
            return (
              <details
                className={`nav-platform nav-platform-${platformKey}`}
                key={platformKey}
                ref={(menu) => { platformMenus.current[index] = menu; }}
                onToggle={(event) => keepOnePlatformOpen(event.currentTarget)}
              >
                <summary className="nav-platform-trigger">
                  {platform.name} <span>⌄</span>
                </summary>
                <div className="platform-dropdown">
                  <Link className="platform-dropdown-heading" href={platform.href} onClick={closeNavigation}>
                    <i className={platformKey}>{platform.mark}</i>
                    <span><b>All {platform.name} services</b><small>{platformServices.length} available options</small></span>
                    <em>↗</em>
                  </Link>
                  <div className="platform-dropdown-links">
                    {platformServices.map((service) => (
                      <Link key={service.slug} href={`/${service.slug}`} onClick={closeNavigation}>
                        {service.name.replace(`${platform.name} `, "")} <span>↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </details>
            );
          })}
          <Link href="/free-tools" onClick={closeNavigation}>Free tools</Link>
          <Link href="/about-us" onClick={closeNavigation}>About</Link>
          <Link className="nav-support" href="/contact-us" onClick={closeNavigation}>Support</Link>
          <CartLink onClick={closeNavigation} />
          <Link className="button button-small" href="/services" onClick={closeNavigation}>View services <span>↗</span></Link>
        </nav>
        <div className="mobile-header-actions">
          <CartLink compact onClick={closeNavigation} />
          <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => {
            const nextMenuState = !menuOpen;
            setMenuOpen(nextMenuState);
            if (!nextMenuState) platformMenus.current.forEach((menu) => menu?.removeAttribute("open"));
          }}>
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
