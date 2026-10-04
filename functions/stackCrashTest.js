module.exports = {
  name: "simLoop",
  code: `
    $if[$getServerVar[simCount;$guildID;0] < 9999999999999;
        $setServerVar[simCount;$sum[$getServerVar[simCount;$guildID;0];1]]
        $log[$getServerVar[simCount] $memory/$memoryTotal]
        $simLoop[]
    ]
  `
};