import React from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatItem = ({ number, label, suffix = "", highlight = false }) => {
  const { i18n } = useTranslation("home");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="text-center p-6" dir={i18n.dir()}>
      <div
        className={`text-4xl md:text-5xl font-bold mb-2 ${
          highlight ? "text-primary" : "text-on-surface"
        }`}
      >
        {inView ? (
          <CountUp end={parseFloat(number)} duration={1.5} suffix={suffix} />
        ) : (
          `0${suffix || ""}`
        )}
      </div>
      <div className="text-muted-dark text-sm uppercase tracking-wider">
        {label}
      </div>
      <div className="mt-4 h-0.5 w-12 mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </div>
  );
};

const StatsGrid = () => {
  const { t, i18n } = useTranslation("home");

  // Pull all stats directly from the JSON
  const stats = [
    {
      number: "10",
      label: t("whyChooseUs.statsGrid.stats.experience"),
      highlight: true,
      suffix: "+"
    },
    {
      number: "100",
      label: t("whyChooseUs.statsGrid.stats.satisfaction"),
      suffix: "%"
    },
    {
      number: "24",
      label: t("whyChooseUs.statsGrid.stats.support"),
      suffix: "/7"
    }
  ];

  return (
    <div
      className="bg-gradient-to-b from-surface to-surface/80 rounded-3xl p-8 border border-muted/50"
      dir={i18n.dir()}
    >
      <h3 className="text-center text-2xl font-bold text-on-surface mb-10">
        {t("whyChooseUs.statsGrid.title")}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatsGrid;
