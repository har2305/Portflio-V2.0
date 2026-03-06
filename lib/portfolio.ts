import rawPortfolio from "@/content/portfolio.json";
import { portfolioSchema } from "@/lib/schemas";
import type { PortfolioData } from "@/lib/types";

export const portfolioData: PortfolioData = portfolioSchema.parse(rawPortfolio);
