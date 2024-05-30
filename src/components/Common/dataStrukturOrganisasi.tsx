import Image from 'next/image';
import React from 'react';

const OrganizationalStructure = ({ members }) => {
  // Kelompokkan anggota berdasarkan jabatan mereka
  const groupedMembers = members.reduce((acc, member) => {
    if (!acc[member.positionBold]) {
      acc[member.positionBold] = [];
    }
    acc[member.positionBold].push(member);
    return acc;
  }, {});

  return (
    <div className="space-y-2">
      {Object.keys(groupedMembers).map((positionBold, index) => (
        <div key={index} className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold text-[#056526] text-center">{positionBold}</h1>
          <div className="flex flex-wrap justify-center space-x-8">
            {groupedMembers[positionBold].map((member, idx) => (
              <div key={idx} className="flex items-center space-x-4 mb-16">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div className="flex flex-col text-left">
                  <h2 className="text-lg font-bold">{member.name}</h2>
                  <p className="text-sm text-[#04914C]">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationalStructure;
