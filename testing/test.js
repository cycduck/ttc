let data = {
  "5": [
    "Eglinton Station",
    "14668",
    "Eglinton Ave West At Henning Ave",
    "2360",
    "Eglinton Ave West At Lascelles Blvd",
    "2375",
    "1461",
    "Queen'S Park Cres West At Hart House",
    "1457",
    "Queen'S Park Cres West At University Library",
    "1463",
    "Queen'S Park Cres At College St (Queen'S Park Station)",
    "1615",
    "University Ave At Gerrard St West",
    "1616",
    "Elm St At University Ave East Side",
    "1053",
    "Gerrard St West At Elizabeth St West Side",
    "1088",
    "Gerrard St East At University Ave"
  ],
  "32": [
    "Eglinton Ave West At Elmsthorpe Ave",
    "2346",
    "Eglinton Ave West At Avenue Rd East Side",
    "11488",
    "Eglinton Ave West At Oriole Pkwy East Side",
    "2394",
    "Eglinton Ave West At Lascelles Blvd East Side",
    "2374",
    "Eglinton Ave West At Duplex Ave",
    "2342",
    "Emmett Ave At Verona Ave",
    "2423",
    "Emmett Ave At Jane St",
    "2427",
    "Jane St At Goldwin Ave South Side",
    "2735",
    "Pine St At Lawrence Ave West",
    "3021",
    "Lawrence Ave West At Jane St",
    "2824",
    "Jane St At Wright Ave",
    "2740",
    "Jane St At Harding Ave",
    "2375"
  ]
}

// FOR EACH RETURNS UNDEFINED
let x = Object.values(data).forEach(info=> {
	return info.filter(info => {
		info === '14668'
	})
})

Object.values(data).forEach(info=> {
	let x =  info.filter(info => {
		info == '14668'
	})
	console.log(x) // even if you console here, there's no return up there...
})

Object.values(data).forEach(info=> {
	let x =  info.filter(info => return {
		info == '14668'
	})
})

Object.values(data).forEach(info=> {
	let x =  info.filter(info => {
		console.log(info == '14668')
		return info == '14668'
	})
	console.log(x)
})