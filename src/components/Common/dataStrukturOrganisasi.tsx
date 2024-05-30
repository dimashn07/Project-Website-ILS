import React from 'react';

const OrganizationalStructure = ({ members }) => {
  const urutanKategori = ["DEWAN PENGAWAS", "SR MANAGER", "KOORDINATOR", "STAFF"];

  const sortedMembers = members.sort((a, b) => {
    return urutanKategori.indexOf(a.kategori) - urutanKategori.indexOf(b.kategori);
  });

  const groupedMembers = sortedMembers.reduce((acc, member) => {
    if (!acc[member.kategori]) {
      acc[member.kategori] = [];
    }
    acc[member.kategori].push(member);
    return acc;
  }, {});

  const getStyle = (kategori) => {
    switch (kategori) {
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
      {Object.keys(groupedMembers).map((kategori, index) => (
        <div key={index} className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold text-[#056526] text-center">{kategori}</h1>
          <div className={`flex flex-wrap justify-center ${kategori === 'KOORDINATOR' || kategori === 'STAFF' ? 'gap-8' : 'space-x-8'}`}>
            {groupedMembers[kategori].map((member, index) => {
              const style = getStyle(kategori);
              return (
                <div key={index} className="flex items-center space-x-4 mb-16 mx-4" style={{ width: style.width + 200 }}>
                  <div className="relative" style={{ width: style.width, height: style.height }}>
                    <img
                      src={member.foto}
                      alt={member.nama}
                      width={style.width}
                      height={style.height}
                      className={style.imgClass}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex flex-col text-left" style={{ flex: 2, minWidth: '200px' }}>
                    <h2 className="text-lg font-bold">{member.nama}</h2>
                    <p className="text-sm text-[#04914C]">{member.jabatan}</p>
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