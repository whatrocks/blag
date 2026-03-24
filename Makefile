.PHONY: help install post serve build clean

SYTE := ./node_modules/.bin/syte

help:
	@printf "Available targets:\n"
	@printf "  make install  Install project dependencies\n"
	@printf "  make serve    Start the local dev server\n"
	@printf "  make build    Build the site\n"
	@printf "  make post     Create a new post interactively\n"
	@printf "  make clean    Remove the build output\n"

install:
	npm install

post:
	@./scripts/new-post.sh

serve:
	@if [ -x "$(SYTE)" ]; then \
		"$(SYTE)" serve; \
	else \
		echo "syte is not installed. Run: make install"; \
		exit 1; \
	fi

build:
	@if [ -x "$(SYTE)" ]; then \
		"$(SYTE)" build; \
	else \
		echo "syte is not installed. Run: make install"; \
		exit 1; \
	fi

clean:
	@if [ -d "dist" ]; then \
		rm -rf dist; \
		echo "Cleaned dist/"; \
	else \
		echo "dist/ does not exist"; \
	fi
