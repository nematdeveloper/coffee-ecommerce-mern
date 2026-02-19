import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from "react-icons/fa";
import boss from "../assets/about/1.png"
import leader from "../assets/about/1.png"
import finance from "../assets/about/1.png"

const Team = () => {
  const { t } = useTranslation("about"); // Using "team" namespace
  
  // Team data with translations
  const TeamMember = [
    {
      role: t('members.ceo.role'),
      name: t('members.ceo.name'),
      info: t('members.ceo.info'),
      image: boss,
    },
    {
      role: t('members.cto.role'),
      name: t('members.cto.name'),
      info: t('members.cto.info'),
      image: leader,
    },
    {
      role: t('members.financeManager.role'),
      name: t('members.financeManager.name'),
      info: t('members.financeManager.info'),
      image: finance,
    },
    
  ];

  const [selectedMember, setSelectedMember] = useState(TeamMember[0]);

  return (
    <div className="mx-auto w-full text-justify px-4 sm:px-6 lg:px-8 xl:w-[80%] rounded-none sm:rounded-3xl bg-gray-200 py-10 sm:p-10 sm:pt-20 flex flex-col items-center gap-8 sm:gap-16">
      
      {/* Selected member */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start w-full">
        {/* Image container */}
        <div className="w-full lg:w-[300px] h-[300px] sm:h-[350px] lg:h-[400px] bg-gray-50 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
          <img
            src={selectedMember.image}
            alt={selectedMember.name}
            className="w-[90%] h-[90%] rounded-2xl object-cover"
          />
        </div>

        {/* Info container */}
        <div className="flex flex-col gap-4 w-full lg:max-w-md">
          <span className="border px-4 py-2 w-fit rounded-md text-sm sm:text-base">
            {selectedMember.role}
          </span>
          <h3 className="text-lg sm:text-xl font-semibold">{selectedMember.name}</h3>
          <p className="whitespace-pre-line text-text-second leading-relaxed text-sm sm:text-base">
            {selectedMember.info}
          </p>
        </div>
      </div>

      {/* Team list */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
        {TeamMember.map((member, index) => (
          <div
            key={index}
            onClick={() => setSelectedMember(member)}
            className="cursor-pointer flex flex-col gap-3 sm:gap-4 items-center w-[calc(50%-0.5rem)] sm:w-auto"
          >
            {/* Image with hover effects */}
            <div className="w-full max-w-[200px] sm:w-[200px] lg:w-[250px] h-[200px] sm:h-[200px] lg:h-[250px] bg-gray-50 rounded-2xl flex items-center justify-center">
              <div className="relative w-[90%] h-[90%] rounded-xl overflow-hidden group">
                {/* Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                />

                {/* Red blur overlay - hidden on mobile, visible on hover for desktop */}
                <div className="absolute inset-0 bg-red-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />

                {/* Arrow icon - hidden on mobile, visible on hover for desktop */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex">
                  <FaArrowRight className="text-white text-2xl lg:text-3xl" />
                </div>
              </div>
            </div>

            {/* Member info */}
            <div className="text-center">
              <span className="font-medium text-sm sm:text-base">{member.name}</span>
              <br />
              <span className="text-xs sm:text-sm text-gray-600">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;