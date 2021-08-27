import hmac
import timeit
import hashlib

my = "QOM0BJ7WDP9rhW9ZYxcM"
key = "e179017a-62b0-4996-8a38-e91aa9f1"

my1 = "eXAuIoEgwy3zg2HEg2t7"
key1 = "nrj485kj-62b0-fret-8a38-3401mjf9"

# encoding as per other answers
byte_key = bytes(key, 'UTF-8')  # key.encode() would also
byte_key1 = bytes(key1, 'UTF-8') 

msg = my.encode()
msg1 = my1.encode()

# now use the hmac.new function and the hexdigest method
h = hmac.new(byte_key, msg, hashlib.sha256).hexdigest()
h1 = hmac.new(byte_key1, msg1, hashlib.sha256).hexdigest()
h2 = h


print(h)
print(h1)
print(h2)
#b = bytes([0x11, 0x00, 0x00, 0x00, 0x07, 0x00])
print("==")
print("-------Different--------")
for i in range(10):
    t = timeit.timeit(lambda: h == h1)
    print(t)
print("----------Same-----------")
for i in range(10):
    t = timeit.timeit(lambda: h == h2)
    print(t)
print("hmac.compare_digest")
print("-------Different--------")
for i in range(10):
    t = timeit.timeit(lambda: hmac.compare_digest(h, h1))
    print(t)
print("----------Same-----------")
for i in range(10):
    t = timeit.timeit(lambda: hmac.compare_digest(h, h2))
    print(t)
