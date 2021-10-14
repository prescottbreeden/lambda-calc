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

// de morgan's laws
// !(p && q) === (!p) || (!q)

// (λxy.x y ((λfab.fba) y)) 
// ((λfab.fba) ((λxy.xyx) p q))
// ((λf.ff) ((λfab.fba) p) ((λfab.fba) q))

beq(Not(And(T)(F))(Or(Not(T))(Not(F))))

// SK cominator calculus

// Starling
// S := λabc.ac(bc)
const S = a => b => c => a(c)(b(c));

const Identity = S(K)(K);
Identity(42);

// Kestrel
// K := λab.a

// -------------------
// Numbers
// -------------------
// zero one two three succ
// zero once twice thrice etc.

// zero := λfa.a
const zero = f => a => a
zero(I)(2)

// once := λfa.fa
const once = f => a => f(a);
once(I)(2)
once(Not)(T)

// twice := λfa.f(fa)
const twice = f => a => f(f(a));
twice(I)(2)
twice(Not)(T)

// thrice := λfa.f(f(f(a)))
const thrice = f => a => f(f(f(a)));
thrice(Not)(T)

// Succ := λn.?
const succ = n => f => a => f(n(f)(a));
succ(zero)(Not)(T)
succ(once)(Not)(T)
jsnum = n => n(x => x + 1)(0)
jsnum(succ(zero))
jsnum(succ(succ(zero)))
jsnum(succ(succ(succ(zero))))

const n1 = succ(zero);
const n2 = succ(n1);
const n3 = succ(n2);
const n4 = succ(n3);

jsnum(succ(n4))

// bluebird := λfga.f(ga)
const B = f => g => a => f(g(a));
B(Not)(Not)(T)
B(jsnum)(succ)(n4)

// Successor := λnf.Bf(nf)
const S = n => f => B(f)(n(f));
jsnum(S(zero))
// jsnum(S(once)) hmmmmmmmm fail

// Add := λnk.n(λnf.Bf(nf) k)
const Add = n => k => n(succ)(k)
const n5 = Add(n3)(n2)
const n6 = Add(n3)(n3)
const n7 = Add(n3)(n4)

// Mult := λnkf.n(kf)
// Mult := λfga.f(ga)
const mult = n => k => f => n(k(f))
const mUlt = n => k => B(n)(k)
const Mult = B
jsnum(Mult(n5)(n4))

// Pow := λnk.kn
// Thrush := λaf.fa
const Pow = n => k => k(n)
jsnum(Pow(n2)(n5))

const Is0 = n => n(K(F))(T)
Is0(zero)
Is0(once)

// -------------------
// Data Structures
// -------------------