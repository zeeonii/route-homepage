import { useEffect, useState } from "react";
import { curationItems, filters, navSections } from "./data/content";

const SPLASH_DURATION = 2000;
const baseUrl = import.meta.env.BASE_URL;
const routeLogoSrc = `${baseUrl}route-logo.png`;
const routeIconSrc = `${baseUrl}route-icon.png`;

function LogoWordmark({ light = false }) {
  return (
    <img
      className="logo-wordmark"
      src={routeLogoSrc}
      alt="RouTe"
    />
  );
}

function SplashScreen() {
  return (
    <section className="screen splash-screen">
      <div className="splash-overlay" />
      <div className="splash-content">
        <LogoWordmark />
        <p className="splash-caption">나만의 여행 큐레이션을 시작해보세요</p>
      </div>
    </section>
  );
}

function FilterBar({ selectedFilters, onFilterChange }) {
  return (
    <div className="filter-row">
      {filters.map((filter) => (
        <label key={filter.key} className="filter-field">
          <span className="filter-label">{filter.label}</span>
          <div className="filter-select-wrap">
            <select
              className="filter-select"
              value={selectedFilters[filter.key]}
              onChange={(event) => onFilterChange(filter.key, event.target.value)}
              aria-label={`${filter.label} 선택`}
            >
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="caret">▼</span>
          </div>
        </label>
      ))}
      <button className="create-button create-button--centered">create</button>
    </div>
  );
}

function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(() =>
    Object.fromEntries(filters.map((filter) => [filter.key, filter.value])),
  );
  const activeItem = curationItems[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % curationItems.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  function handleFilterChange(key, value) {
    setSelectedFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSearchToggle() {
    setIsSearchOpen((current) => !current);
    setIsMenuOpen(false);
  }

  function handleMenuToggle() {
    setIsMenuOpen((current) => !current);
    setIsSearchOpen(false);
  }

  return (
    <section className="screen home-screen">
      {isSearchOpen ? (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="검색창">
          <div className="search-panel">
            <div className="search-input-wrap">
              <img className="search-logo" src={routeIconSrc} alt="RouTe 아이콘" />
              <input
                className="search-input"
                type="search"
                placeholder="여행지, 일정, 테마를 검색해보세요"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoFocus
              />
            </div>
            <button className="search-close" onClick={handleSearchToggle}>
              닫기
            </button>
          </div>
        </div>
      ) : null}

      {isMenuOpen ? (
        <div className="menu-panel" role="dialog" aria-modal="true" aria-label="메뉴">
          <div className="menu-list">
            {navSections.map((section, index) => (
              <button
                key={section}
                className="menu-list-item"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <header className="home-header">
        <div className="headline-group">
          <h1>
            <span>루트와</span>
            <span>함께 떠나볼까요?</span>
          </h1>
        </div>
        <div className="top-actions top-actions--home">
          <button className="icon-circle" aria-label="검색" onClick={handleSearchToggle}>
            <span className="search-lens" />
          </button>
          <button className="icon-button" aria-label="메뉴 열기" onClick={handleMenuToggle}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <FilterBar
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      <div className="section-title">
        <h2>오늘의 큐레이션</h2>
        <button className="text-link">전체보기</button>
      </div>

      <article className="curation-card">
        <img src={activeItem.image} alt={activeItem.title} className="curation-image" />
        <div className="curation-overlay" />
        <div className="curation-copy">
          <p>{activeItem.title}</p>
          <strong>{activeItem.subtitle}</strong>
        </div>
        <div className="curation-brand">
          <LogoWordmark />
        </div>
      </article>

      <div className="pagination-dots" aria-label="큐레이션 페이지">
        {curationItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`dot ${index === activeIndex ? "is-active" : ""}`}
            aria-label={`${index + 1}번 큐레이션`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsSplashVisible(false);
    }, SPLASH_DURATION);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="app-shell">
      <div className={`screen-stack ${isSplashVisible ? "show-splash" : "show-home"}`}>
        <SplashScreen />
        <HomeScreen />
      </div>
    </main>
  );
}
