import { SiteLoader } from "../data/components/SiteLoader";
import { HomePage } from "../pages/HomePage";
import { mountPage } from "../mountPage";

mountPage(
  <SiteLoader>
    <HomePage />
  </SiteLoader>
);
