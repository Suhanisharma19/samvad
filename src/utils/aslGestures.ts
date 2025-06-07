import { GestureDescription, Finger, FingerCurl, FingerDirection } from 'fingerpose';

// Helper function to create finger curl configuration for all fingers
const configureFingersAs = (
  gesture: GestureDescription,
  curl: typeof FingerCurl[keyof typeof FingerCurl],
  excludeFingers: number[] = []
) => {
  const allFingers = [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky];
  allFingers.forEach(finger => {
    if (!excludeFingers.includes(finger)) {
      gesture.addCurl(finger, curl, 1.0);
    }
  });
};

// ASL Letter A - Made more distinctive from S and T
const aSign = new GestureDescription('A');
// Thumb sticks out to the side more strictly
aSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
aSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
aSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.5);
// Other fingers are more strictly curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  aSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  aSign.addDirection(finger, FingerDirection.VerticalDown, 1.0);
  // Prevent confusion with S by ensuring fingers aren't pointing horizontally
  aSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.0);
}

// ASL Letter B
const bSign = new GestureDescription('B');
bSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  bSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  bSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// ASL Letter C
const cSign = new GestureDescription('C');
// All fingers and thumb curved in C shape
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  cSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
}
// Thumb points more upward
cSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
// Other fingers curve toward the thumb
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  cSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.7);
  cSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.3);
}

// ASL Letter D
const dSign = new GestureDescription('D');
dSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
dSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  dSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
dSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

// ASL Letter E - Made more distinctive from A and S
const eSign = new GestureDescription('E');
// All fingers are curled but not as tightly as in A
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  eSign.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  eSign.addCurl(finger, FingerCurl.FullCurl, 0.1);
  eSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.7);
  eSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.3);
}
// Thumb is pressed against the fingers more horizontally
eSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
eSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.8);
eSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.2);

// ASL Letter F
const fSign = new GestureDescription('F');
// Index and thumb form a circle
fSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
fSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
fSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
fSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
// Other fingers are straight up
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  fSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  fSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// ASL Letter G
const gSign = new GestureDescription('G');
gSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
gSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  gSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
gSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
gSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// ASL Letter H
const hSign = new GestureDescription('H');
// Index and middle fingers straight
for (let finger of [Finger.Index, Finger.Middle]) {
  hSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  hSign.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}
// Other fingers curled
for (let finger of [Finger.Ring, Finger.Pinky]) {
  hSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
hSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

// ASL Letter I
const iSign = new GestureDescription('I');
// Only pinky straight up
iSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
iSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
// All other fingers curled
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring]) {
  iSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

// ASL Letter J
const jSign = new GestureDescription('J');
// Like I but with a downward motion (we'll detect the static position)
jSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
jSign.addDirection(Finger.Pinky, FingerDirection.DiagonalDownRight, 1.0);
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring]) {
  jSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

// ASL Letter K
const kSign = new GestureDescription('K');
// Index and middle fingers pointing up
kSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
kSign.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
kSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
kSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
// Other fingers curled
for (let finger of [Finger.Ring, Finger.Pinky]) {
  kSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
kSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

// ASL Letter L
const lSign = new GestureDescription('L');
// Thumb and index form L shape
lSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
lSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
lSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
lSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
// Other fingers curled
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  lSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

// ASL Letter M - Made more distinctive from N
const mSign = new GestureDescription('M');
// Three fingers tucked over thumb more precisely
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  mSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  mSign.addDirection(finger, FingerDirection.DiagonalDownRight, 0.8);
  mSign.addDirection(finger, FingerDirection.HorizontalRight, 0.2);
}
mSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
mSign.addDirection(Finger.Pinky, FingerDirection.DiagonalDownRight, 1.0);
mSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
mSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// ASL Letter N - Made more distinctive from M
const nSign = new GestureDescription('N');
// Two fingers tucked over thumb with specific positioning
for (let finger of [Finger.Index, Finger.Middle]) {
  nSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  nSign.addDirection(finger, FingerDirection.DiagonalDownRight, 0.8);
  nSign.addDirection(finger, FingerDirection.HorizontalRight, 0.2);
}
// Ring and pinky more tightly curled to distinguish from M
for (let finger of [Finger.Ring, Finger.Pinky]) {
  nSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
  nSign.addDirection(finger, FingerDirection.VerticalDown, 1.0);
}
nSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
nSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// ASL Letter O
const oSign = new GestureDescription('O');
// Fingers form O shape
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  oSign.addCurl(finger, FingerCurl.HalfCurl, 1.0);
  oSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
}
oSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
oSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// ASL Letter P
const pSign = new GestureDescription('P');
// Index pointing down, thumb and middle out
pSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
pSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
pSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
pSign.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);
for (let finger of [Finger.Ring, Finger.Pinky]) {
  pSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
pSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);

// ASL Letter Q
const qSign = new GestureDescription('Q');
// Like G but pointing down
qSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
qSign.addDirection(Finger.Index, FingerDirection.DiagonalDownRight, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  qSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
qSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
qSign.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 1.0);

// ASL Letter R
const rSign = new GestureDescription('R');
// Index and middle crossed
rSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
rSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
rSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
rSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
for (let finger of [Finger.Ring, Finger.Pinky]) {
  rSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
rSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// ASL Letter S - Made more distinctive from A
const sSign = new GestureDescription('S');
// Fist with thumb over fingers in specific position
configureFingersAs(sSign, FingerCurl.FullCurl);
sSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
sSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.7);
sSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.3);
// Add specific directions for other fingers to distinguish from A
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  sSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.7);
  sSign.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.3);
}

// ASL Letter T
const tSign = new GestureDescription('T');
// Index finger bent, thumb between index and middle
tSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
tSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  tSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
tSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
tSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// ASL Letter U
const uSign = new GestureDescription('U');
// Index and middle straight up
for (let finger of [Finger.Index, Finger.Middle]) {
  uSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  uSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
for (let finger of [Finger.Ring, Finger.Pinky]) {
  uSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
uSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// ASL Letter V
const vSign = new GestureDescription('V');
// Index and middle in V shape
for (let finger of [Finger.Index, Finger.Middle]) {
  vSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  vSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.7);
  vSign.addDirection(finger, FingerDirection.VerticalUp, 0.3);
}
for (let finger of [Finger.Ring, Finger.Pinky]) {
  vSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
vSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// ASL Letter W
const wSign = new GestureDescription('W');
// Index, middle, and ring fingers spread
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  wSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  wSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.7);
  wSign.addDirection(finger, FingerDirection.VerticalUp, 0.3);
}
wSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
wSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// ASL Letter X
const xSign = new GestureDescription('X');
// Index finger bent
xSign.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
xSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  xSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
xSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// ASL Letter Y
const ySign = new GestureDescription('Y');
// Thumb and pinky out
ySign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ySign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
ySign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
ySign.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
  ySign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

// ASL Letter Z
const zSign = new GestureDescription('Z');
// Index finger pointing forward
zSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
zSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  zSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
zSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// Common ASL Signs/Phrases

// ASL Sign for "HELLO" - B hand shape near forehead, palm facing forward
const helloSign = new GestureDescription('HELLO');
// All fingers straight
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  helloSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  // Fingers pointing up with slight tilt
  helloSign.addDirection(finger, FingerDirection.VerticalUp, 0.7);
  helloSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.3);
}
// Thumb position
helloSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
helloSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// ASL Sign for "THANK YOU" - Flat hand from chin moving forward
const thankYouSign = new GestureDescription('THANK_YOU');
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thankYouSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  thankYouSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.6);
  thankYouSign.addDirection(finger, FingerDirection.HorizontalRight, 0.4);
}

// ASL Sign for "YES" - Fist nodding
const yesSign = new GestureDescription('YES');
configureFingersAs(yesSign, FingerCurl.FullCurl);
yesSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.7);
yesSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.3);

// ASL Sign for "NO" - Index and middle finger in "N" shape
const noSign = new GestureDescription('NO');
// Index and middle fingers extended and spread
for (let finger of [Finger.Index, Finger.Middle]) {
  noSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  noSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.7);
  noSign.addDirection(finger, FingerDirection.VerticalUp, 0.3);
}
// Other fingers curled tightly
for (let finger of [Finger.Ring, Finger.Pinky]) {
  noSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
// Thumb tucked
noSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// ASL Sign for "HELP" - Thumb up on flat hand
const helpSign = new GestureDescription('HELP');
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  helpSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  helpSign.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
}
helpSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
helpSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

// ASL Sign for "I LOVE YOU" - "I", "L" and "Y" combined
const iLoveYouSign = new GestureDescription('I_LOVE_YOU');
// Pinky up ("I")
iLoveYouSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
iLoveYouSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
// Thumb out ("L")
iLoveYouSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
iLoveYouSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
// Index up ("L")
iLoveYouSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
iLoveYouSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
// Middle and ring fingers curled
for (let finger of [Finger.Middle, Finger.Ring]) {
  iLoveYouSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

// ASL Sign for "PLEASE" - Flat hand circling on chest
const pleaseSign = new GestureDescription('PLEASE');
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pleaseSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  pleaseSign.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
}

// ASL Sign for "SORRY" - Fist circling on chest
const sorrySign = new GestureDescription('SORRY');
configureFingersAs(sorrySign, FingerCurl.FullCurl);
sorrySign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// ASL Sign for "STOP" - Vertical flat hand
const stopSign = new GestureDescription('STOP');
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  stopSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  stopSign.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

// ASL Sign for "EAT" - Bunched fingers to mouth
const eatSign = new GestureDescription('EAT');
// Fingers bunched together and curved
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  eatSign.addCurl(finger, FingerCurl.HalfCurl, 0.7);
  eatSign.addCurl(finger, FingerCurl.FullCurl, 0.3);
  eatSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.6);
  eatSign.addDirection(finger, FingerDirection.VerticalUp, 0.4);
}
// Thumb position
eatSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
eatSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.7);
eatSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.3);

// ASL Sign for "DRINK" - C hand shape moving to mouth
const drinkSign = new GestureDescription('DRINK');
// C hand shape
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  drinkSign.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  drinkSign.addCurl(finger, FingerCurl.FullCurl, 0.1);
  drinkSign.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.7);
  drinkSign.addDirection(finger, FingerDirection.VerticalUp, 0.3);
}
// Thumb position for C shape
drinkSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
drinkSign.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.7);
drinkSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.3);

// ASL Sign for "MORE" - Flat hands coming together, fingers pointing forward
const moreSign = new GestureDescription('MORE');
// All fingers straight and together
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  moreSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  moreSign.addDirection(finger, FingerDirection.HorizontalRight, 0.7);
  moreSign.addDirection(finger, FingerDirection.DiagonalUpRight, 0.3);
}
// Thumb position
moreSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
moreSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

// ASL Sign for "WHAT" - Index finger shaking
const whatSign = new GestureDescription('WHAT');
whatSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
whatSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  whatSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
whatSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

// ASL Sign for "WHERE" - Index finger pointing
const whereSign = new GestureDescription('WHERE');
whereSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
whereSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  whereSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
whereSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// ASL Sign for "BATHROOM" - Shaking 'T' hand
const bathroomSign = new GestureDescription('BATHROOM');
// T handshape
bathroomSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
bathroomSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
bathroomSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
bathroomSign.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  bathroomSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

// ASL Sign for "HOW" - Flat hands facing each other
const howSign = new GestureDescription('HOW');
for (let finger of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  howSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  howSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.7);
  howSign.addDirection(finger, FingerDirection.HorizontalRight, 0.3);
}

// ASL Sign for "WHEN" - Index finger pointing to wrist
const whenSign = new GestureDescription('WHEN');
whenSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
whenSign.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 1.0);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  whenSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
whenSign.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

// ASL Sign for "MY NAME IS" - Index fingers pointing at each other
const myNameIsSign = new GestureDescription('MY_NAME_IS');
myNameIsSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
myNameIsSign.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.5);
myNameIsSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.5);
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  myNameIsSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
myNameIsSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// ASL Sign for "PAIN" - Index fingers pointing toward each other
const painSign = new GestureDescription('PAIN');
for (let finger of [Finger.Index]) {
  painSign.addCurl(finger, FingerCurl.NoCurl, 1.0);
  painSign.addDirection(finger, FingerDirection.HorizontalLeft, 0.5);
  painSign.addDirection(finger, FingerDirection.HorizontalRight, 0.5);
}
for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  painSign.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
painSign.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);

// Export all gestures
export const aslGestures = {
  aSign,
  bSign,
  cSign,
  dSign,
  eSign,
  fSign,
  gSign,
  hSign,
  iSign,
  jSign,
  kSign,
  lSign,
  mSign,
  nSign,
  oSign,
  pSign,
  qSign,
  rSign,
  sSign,
  tSign,
  uSign,
  vSign,
  wSign,
  xSign,
  ySign,
  zSign,
  helloSign,
  thankYouSign,
  yesSign,
  noSign,
  helpSign,
  iLoveYouSign,
  pleaseSign,
  sorrySign,
  stopSign,
  eatSign,
  drinkSign,
  moreSign,
  whatSign,
  whereSign,
  bathroomSign,
  howSign,
  whenSign,
  myNameIsSign,
  painSign
}; 