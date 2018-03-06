# Avsimach web

## Quick start
```
yarn install
npm run start
```

## Firebase data structure
### assets
```
name: String, // asset name
url: String // asset image as url
```
### takes
```
active: Boolean, // show on main page
campaign_mission: String, // campaign:mission
campaign_mission_take: String, // campaign:mission:take
description: String, // take's summary
redFlights: [
	{
		flight: String, // flight's title
		description: String // what have they achieved
	},
	...
],
blueFlights: Array, // same as above
redPlayers: [
	{
		name: String, // actual player name
		asset: String, // actual flown asset
	},
	...
],
bluePlayers: Array // same as above
```
### kills
```
name: String, // actual player name
campaign_mission_take: String, // path to take, i.e. campaign:mission:take
type: String, // air|land|naval
killedAsset: String, // actual killed asset's name
byAsset: String, // actual killer's asset name
byWeapon: String,
player: Boolean|String, // false or actual player name
```
### deaths
```
name: String, // actual player name
campaign_mission_take: String, // path to take, i.e. campaign:mission:take
asset: String, // actual lost asset name
byPlayer: Boolean|String, // false or actual player name
byAsset: String, // actual killer's asset name,
byWeapon: String
```
