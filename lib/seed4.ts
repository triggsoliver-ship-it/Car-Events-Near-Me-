import type { CarEvent } from "@/lib/types";

// Real UK car track days from our partner TrackDays.co.uk.
// Each row: DD/MM/YY|Venue|Price|TrackDaysID  -> bookable via affiliate link (commission).
const VEN: Record<string, [string, string, string]> = {
  "Brands Hatch": ["South East", "Kent", "West Kingsdown"],
  "Snetterton": ["East of England", "Norfolk", "Norwich"],
  "Cadwell Park": ["East Midlands", "Lincolnshire", "Louth"],
  "Anglesey": ["Wales", "Anglesey", "Ty Croes"],
  "Oulton Park": ["North West", "Cheshire", "Tarporley"],
  "Bedford Autodrome": ["East of England", "Bedfordshire", "Bedford"],
  "Thruxton": ["South East", "Hampshire", "Andover"],
  "Blyton Park": ["East Midlands", "Lincolnshire", "Gainsborough"],
  "Donington Park": ["East Midlands", "Leicestershire", "Castle Donington"],
  "Seighford": ["West Midlands", "Staffordshire", "Stafford"],
  "Goodwood": ["South East", "West Sussex", "Chichester"],
  "Lydden Hill": ["South East", "Kent", "Canterbury"],
  "Croft": ["Yorkshire", "North Yorkshire", "Darlington"],
  "Mallory Park": ["East Midlands", "Leicestershire", "Hinckley"],
  "Castle Combe": ["South West", "Wiltshire", "Chippenham"],
  "Silverstone": ["East Midlands", "Northamptonshire", "Towcester"],
  "Abingdon Track Days": ["South East", "Oxfordshire", "Abingdon"],
};

const RAW = `
30/06/26|Snetterton|99|20143
01/07/26|Brands Hatch|149|20085
02/07/26|Cadwell Park|99|20102
02/07/26|Anglesey|249|20168
03/07/26|Oulton Park|429|20172
06/07/26|Brands Hatch|299|20452
06/07/26|Bedford Autodrome|143|20460
06/07/26|Brands Hatch|139|20461
06/07/26|Anglesey|225|20623
07/07/26|Thruxton|179|20152
07/07/26|Snetterton|99|20144
08/07/26|Brands Hatch|149|20241
08/07/26|Cadwell Park|188|20448
12/07/26|Blyton Park|169|20066
13/07/26|Thruxton|169|20624
14/07/26|Donington Park|159|20625
14/07/26|Oulton Park|310|20454
14/07/26|Thruxton|189|19944
15/07/26|Cadwell Park|99|20103
16/07/26|Seighford|159|19780
16/07/26|Donington Park|159|20626
17/07/26|Thruxton|199|19977
18/07/26|Goodwood|750|19792
18/07/26|Lydden Hill|160|20233
20/07/26|Cadwell Park|175|20449
20/07/26|Bedford Autodrome|199|20283
20/07/26|Cadwell Park|98|20463
20/07/26|Croft|249|19947
21/07/26|Snetterton|99|20145
21/07/26|Snetterton|209|20146
21/07/26|Oulton Park|339|20132
22/07/26|Brands Hatch|299|20453
22/07/26|Donington Park|295|20451
23/07/26|Donington Park|169|19963
24/07/26|Mallory Park|179|20126
27/07/26|Snetterton|89|20464
27/07/26|Croft|259|20516
27/07/26|Bedford Autodrome|188|20456
27/07/26|Snetterton|188|20457
27/07/26|Bedford Autodrome|149|20627
28/07/26|Oulton Park|310|20455
28/07/26|Brands Hatch|139|20462
28/07/26|Donington Park|599|20182
29/07/26|Donington Park|174|20247
29/07/26|Snetterton|199|20604
29/07/26|Donington Park|329|19976
29/07/26|Brands Hatch|149|19877
01/08/26|Blyton Park|169|20069
01/08/26|Lydden Hill|160|20234
03/08/26|Brands Hatch|289|20586
05/08/26|Cadwell Park|175|20573
05/08/26|Oulton Park|310|20569
05/08/26|Snetterton|89|20599
05/08/26|Cadwell Park|99|20601
05/08/26|Donington Park|149|20125
05/08/26|Donington Park|319|20117
06/08/26|Snetterton|188|20579
10/08/26|Bedford Autodrome|199|20284
10/08/26|Brands Hatch|149|20086
10/08/26|Snetterton|114|19955
12/08/26|Castle Combe|279|20162
12/08/26|Brands Hatch|299|20581
12/08/26|Brands Hatch|139|20594
13/08/26|Cadwell Park|99|20104
13/08/26|Cadwell Park|189|20095
13/08/26|Silverstone|1049|20011
14/08/26|Croft|259|20111
14/08/26|Goodwood|699|20190
15/08/26|Blyton Park|169|20070
16/08/26|Blyton Park|169|20071
17/08/26|Silverstone|670|20005
17/08/26|Anglesey|249|20169
17/08/26|Brands Hatch|499|20587
17/08/26|Brands Hatch|139|20596
17/08/26|Bedford Autodrome|143|20597
18/08/26|Brands Hatch|169|19960
19/08/26|Brands Hatch|149|20087
19/08/26|Donington Park|139|20592
20/08/26|Cadwell Park|99|20514
21/08/26|Cadwell Park|199|20520
24/08/26|Cadwell Park|175|20574
24/08/26|Cadwell Park|99|20602
24/08/26|Snetterton|89|20600
24/08/26|Castle Combe|249|20106
25/08/26|Thruxton|179|20153
25/08/26|Oulton Park|339|20134
26/08/26|Donington Park|169|19964
26/08/26|Snetterton|99|20603
27/08/26|Brands Hatch|299|20582
28/08/26|Brands Hatch|699|20186
28/08/26|Mallory Park|179|20127
29/08/26|Castle Combe|249|20429
29/08/26|Bedford Autodrome|249|20588
31/08/26|Anglesey|249|19949
01/09/26|Donington Park|149|19965
01/09/26|Brands Hatch|299|20583
02/09/26|Donington Park|295|20590
04/09/26|Cadwell Park|145|20577
05/09/26|Lydden Hill|160|20235
07/09/26|Snetterton|175|20578
07/09/26|Bedford Autodrome|188|20589
07/09/26|Bedford Autodrome|143|20598
08/09/26|Oulton Park|310|20570
08/09/26|Silverstone|670|20006
09/09/26|Cadwell Park|189|20096
09/09/26|Brands Hatch|299|20584
09/09/26|Snetterton|299|20580
09/09/26|Brands Hatch|139|20595
09/09/26|Donington Park|139|20593
10/09/26|Thruxton|179|20154
10/09/26|Cadwell Park|99|19967
10/09/26|Seighford|159|19781
12/09/26|Blyton Park|169|20072
13/09/26|Blyton Park|169|20073
14/09/26|Croft|259|20112
14/09/26|Cadwell Park|175|20575
15/09/26|Castle Combe|249|20107
15/09/26|Oulton Park|339|20136
15/09/26|Brands Hatch|329|19929
16/09/26|Anglesey|169|20060
16/09/26|Oulton Park|295|20572
17/09/26|Donington Park|599|20183
17/09/26|Thruxton|189|19945
21/09/26|Silverstone|1049|20012
21/09/26|Snetterton|209|20147
22/09/26|Brands Hatch|299|20585
23/09/26|Oulton Park|310|20571
23/09/26|Donington Park|319|20118
28/09/26|Anglesey|239|20170
28/09/26|Silverstone|660|20007
28/09/26|Bedford Autodrome|199|19942
28/09/26|Cadwell Park|175|20576
28/09/26|Castle Combe|229|20197
28/09/26|Donington Park|295|20591
29/09/26|Croft|259|20113
01/10/26|Cadwell Park|159|20097
01/10/26|Snetterton|179|20148
02/10/26|Castle Combe|269|20164
03/10/26|Blyton Park|169|20074
05/10/26|Silverstone|608|20008
07/10/26|Donington Park|329|20176
09/10/26|Mallory Park|179|20129
09/10/26|Thruxton|169|20202
12/10/26|Bedford Autodrome|179|20285
12/10/26|Croft|239|20114
12/10/26|Anglesey|189|19950
13/10/26|Snetterton|179|19939
13/10/26|Silverstone|314|19997
13/10/26|Castle Combe|239|20108
14/10/26|Thruxton|169|20155
16/10/26|Abingdon Track Days|165|20333
19/10/26|Anglesey|159|20061
23/10/26|Oulton Park|249|20138
23/10/26|Cadwell Park|159|20098
23/10/26|Donington Park|229|20119
24/10/26|Cadwell Park|209|20099
24/10/26|Blyton Park|159|20075
24/10/26|Goodwood|750|19793
24/10/26|Lydden Hill|160|20236
25/10/26|Blyton Park|159|20076
27/10/26|Snetterton|129|20149
28/10/26|Brands Hatch|269|19930
29/10/26|Castle Combe|229|20198
01/11/26|Mallory Park|139|20130
02/11/26|Croft|199|20115
02/11/26|Silverstone|450|20009
04/11/26|Donington Park|149|20120
04/11/26|Thruxton|139|20156
05/11/26|Castle Combe|199|20109
06/11/26|Snetterton|199|20189
09/11/26|Donington Park|194|20246
09/11/26|Bedford Autodrome|119|20286
09/11/26|Brands Hatch|149|20083
09/11/26|Snetterton|114|19940
10/11/26|Silverstone|314|19998
11/11/26|Donington Park|164|19937
13/11/26|Oulton Park|149|20139
14/11/26|Oulton Park|199|20140
14/11/26|Blyton Park|119|20077
14/11/26|Lydden Hill|160|20237
15/11/26|Blyton Park|119|20078
15/11/26|Anglesey|129|20062
15/11/26|Cadwell Park|149|20100
20/11/26|Donington Park|199|20177
21/11/26|Oulton Park|199|20141
21/11/26|Bedford Autodrome|179|20287
22/11/26|Snetterton|159|20150
23/11/26|Castle Combe|189|20165
24/11/26|Brands Hatch|174|19931
27/11/26|Cadwell Park|109|20101
27/11/26|Oulton Park|194|20248
28/11/26|Castle Combe|219|20199
28/11/26|Donington Park|209|20121
28/11/26|Blyton Park|119|20079
29/11/26|Blyton Park|119|20080
02/12/26|Oulton Park|134|19951
02/12/26|Donington Park|199|20178
04/12/26|Brands Hatch|174|20249
05/12/26|Mallory Park|139|20131
06/12/26|Donington Park|199|19974
07/12/26|Snetterton|99|20151
08/12/26|Brands Hatch|129|20084
09/12/26|Donington Park|119|20122
12/12/26|Oulton Park|169|20142
12/12/26|Bedford Autodrome|159|20288
13/12/26|Donington Park|169|20123
13/12/26|Anglesey|129|20063
15/12/26|Brands Hatch|149|19932
16/12/26|Seighford|159|19782
18/12/26|Oulton Park|159|19969
19/12/26|Anglesey|159|19973
28/12/26|Blyton Park|149|20081
29/12/26|Blyton Park|149|20082
`.trim();

export const SEED_4: CarEvent[] = RAW.split("\n").map((line, i) => {
  const [d, ven, price, tid] = line.split("|");
  const [dd, mm, yy] = d.split("/");
  const iso = `20${yy}-${mm}-${dd}`;
  const [region, county, town] = VEN[ven];
  const vshort = ven === "Abingdon Track Days" ? "Abingdon" : ven;
  return {
    id: 1001 + i,
    name: `${vshort} Car Track Day`,
    type: "track day",
    region,
    county,
    town,
    venue: vshort,
    start: iso,
    end: iso,
    img: 15155737,
    organiser: "TrackDays.co.uk",
    desc: `Take your own car on track at ${vshort}. Open pit-lane car track day booked via our partner TrackDays.co.uk.`,
    tiers: [{ name: "Driver", price: Number(price) }],
    bookingUrl: `https://www.trackdays.co.uk/book/cartrackday/${tid}/`,
  };
});
