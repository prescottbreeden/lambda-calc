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
