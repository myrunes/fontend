### NAMES AND LOCS ############################
PRETTIER_CFG = "$(CURDIR)/.prettierrc.yml"
###############################################

### EXECUTABLES ###############################
NPM    	 = npm
PRETTIER = prettier
###############################################

# ---------------------------------------------

BIN = $(BINPATH)/$(APPNAME)

TAG        = $(shell git describe --tags)
COMMIT     = $(shell git rev-parse HEAD)


ifneq ($(GOOS),)
	BIN := $(BIN)_$(GOOS)
endif

ifneq ($(GOARCH),)
	BIN := $(BIN)_$(GOARCH)
endif

ifneq ($(TAG),)
	BIN := $(BIN)_$(TAG)
endif

ifeq ($(OS),Windows_NT)
	ifeq ($(GOOS),)
		BIN := $(BIN).exe
	endif
endif

ifeq ($(GOOS),windows)
	BIN := $(BIN).exe
endif


PHONY = _make
_make: deps build fe cleanup

PHONY += deps
deps:
	$(NPM) install

PHONY += lint
lint:
	$(GOLINT) ./... | $(GREP) -v vendor || true

PHONY += cleanup
cleanup:

PHONY += build
build:
	$(NPM) run build

PHONY += run
run:
	$(NPM) run serve

PHONY += prettify
prettify:
	$(PRETTIER) \
	    --config $(PRETTIER_CFG) \
	    --write \
	    	$(CURDIR)/src/**/*.js \
	    	$(CURDIR)/src/**/**/*.js \
	    	$(CURDIR)/src/**/*.vue \
	    	$(CURDIR)/src/**/**/*.vue

PHONY += help
help:
	@echo "Available targets:"
	@echo "  #        - creates binary in ./bin"
	@echo "  cleanup  - tidy up temporary stuff created by build or scripts"
	@echo "  deps     - ensure dependencies are installed"
	@echo "  run      - debug run front end vue live-server"
	@echo ""


.PHONY: $(PHONY)