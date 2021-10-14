console.log('================');

const print = (msg = '') => (x) => console.log(msg, x);

// Idintity (Idiot)
// I := λa.a
const I = (a) => a;
print('Identity')(I(I));

// Mocking Bird
// M := λf.ff
const M = (f) => f(f);
print('Mocking Bird')(M(I));
// M(M) -> stack overflow

// currying (all functions are unary)
// λaλbλc.b
// λabc.b
// a => b => c => b

// Kestrel
// K := λab.a
const K = (a) => (b) => a;
print('Kestrel of Identity & Mocking Bird')(K(I)(M));
print('Kestrel of Kestrel & Mocking Bird')(K(K)(M));
print('Kestrel of Mocking Bird & Identity')(K(M)(I));

print()(K(I)(42));

// Kite
// KI := λab.b
const KI = K(I);

// derive Kite
const kite = (x) => (y) => K(I)(x)(y) === I(y) && I(y) === y;
print()(kite(42)(82));
print()(KI(42)(82));

// Cardinal
// C := λfab.fba
const C = f => a => b => f(b)(a);
print('Cardinal of Kestrel')(C(K)(I)(M))
print('Kite')(KI(I)(M))

// Everything can be functions
// Booleans
// !x == y || (a && z)
// result := func exp1 exp2
const result = 'bool' ? 'exp1' : 'exp2'

const T = K
const F = KI // = CK

T.inspect = () => 'T / K'
F.inspect = () => 'F / KI'


// Not := λp.pFT
const Not = p => p(F)(T);
Not(T)
Not(F)

Not(K) === KI
Not(KI) === K

C(T)(1)(2) === 2
C(F)(1)(2) === 1

// extensional equality vs intentional equality
// can't tell difference between behavior of Cardinel of Kestrel with...

// And := λpq.pqp
const And = p => q => p(q)(p)
And(F)(T)
And(T)(T)
And(F)(F)

// Or := λpq.ppq
const Or = p => q => p(p)(q)
Or(F)(T)
Or(T)(F)
Or(T)(T)
Or(F)(F)

M(F)(T)
M(T)(F)
M(T)(T)
M(F)(F)

Or == M // extensional equality

// boolean equality := λpq.p q(Not q)
const beq = (p) => (q) => p(q)(Not(q))

beq(T)(F)
beq(T)(T)
beq(F)(F)
