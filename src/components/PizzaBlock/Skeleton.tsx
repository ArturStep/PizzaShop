import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="136" cy="108" r="108" />
    <rect x="0" y="240" rx="6" ry="6" width="266" height="27" />
    <rect x="0" y="290" rx="6" ry="6" width="266" height="76" />
    <rect x="136" y="377" rx="24" ry="24" width="130" height="40" />
    <rect x="0" y="391" rx="6" ry="6" width="92" height="27" />
  </ContentLoader>
);

export default Skeleton;
