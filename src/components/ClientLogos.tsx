import React from 'react';

const ClientLogos = () => {
  const logos = [
    { name: "Absolute Translations", url: "/Absolute Logo.png" },
    { name: "Texas Auto Value", url: "/TAV logo.png" },
    { name: "Mbay Mobility", url: "/mbay mobility.png" },
  ];

  return (
    <div className="py-16 bg-[color:var(--background)]">
      <div className="container max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-cal mb-16 text-center">Clients</h2>
        <div className="flex flex-row flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible justify-start md:justify-between items-center gap-1 md:gap-0">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="lift-on-hover cursor-pointer p-4 rounded-lg flex items-center justify-center bg-[color:var(--background)]"
            >
              <img 
                src={logo.url} 
                alt={logo.name + ' logo'}
                className="h-32 w-80 object-contain logo-charcoal"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
