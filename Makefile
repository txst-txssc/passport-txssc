NODE = node
TEST = vows
TESTS ?= test/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/passport-txssc/*.js
	dox \
		--title Passport-TxSSC \
		--desc "TxSSC authentication strategy for Passport" \
		$(shell find lib/passport-txssc/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
