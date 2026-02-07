import { ReactNode } from "react";
import './pagelayout.css';

export interface PageLayoutProps {
  children?: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="container">
      <div className="content">
        {children}
      </div>
    </div>
  );
}
