import "./footer.scss";

export default function AppFooter() {
  return (
    <footer class="app-footer">
      <span className="app-footer__status"></span>
      <span className="app-footer__version">
        <code>v{APP_VERSION}</code>
      </span>
    </footer>
  );
}
