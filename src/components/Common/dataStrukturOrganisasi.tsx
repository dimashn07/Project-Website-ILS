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

  // Tentukan style untuk setiap jabatan
  const getStyle = (positionBold) => {
    switch (positionBold) {
      case 'BADAN PENGAWAS':
      case 'SR MANAGER':
        return {
          width: 150,
          height: 150,
          imgClass: '',
        };
      case 'KOORDINATOR':
      case 'STAFF':
        return {
          width: 100,
          height: 100,
          imgClass: 'rounded-full',
        };
      default:
        return {
          width: 150,
          height: 150,
          imgClass: '',
        };
    }
  };

  return (
    <div className="space-y-2">
      {Object.keys(groupedMembers).map((positionBold, index) => (
        <div key={index} className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold text-[#056526] text-center">{positionBold}</h1>
          <div className={`flex flex-wrap justify-center ${positionBold === 'KOORDINATOR' || positionBold === 'STAFF' ? 'gap-8' : 'space-x-8'}`}>
            {groupedMembers[positionBold].map((member, idx) => {
              const style = getStyle(positionBold);
              return (
                <div key={idx} className="flex items-center space-x-4 mb-16 mx-4" style={{ width: style.width + 200 }}>
                  <div className="relative" style={{ width: style.width, height: style.height }}>
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={style.width}
                      height={style.height}
                      className={style.imgClass}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex flex-col text-left" style={{ flex: 2, minWidth: '200px' }}>
                    <h2 className="text-lg font-bold">{member.name}</h2>
                    <p className="text-sm text-[#04914C]">{member.position}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationalStructure;
