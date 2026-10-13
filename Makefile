.PHONY: help install post serve build preview check clean

ASTRO := ./node_modules/.bin/astro

help:
	@printf "Available targets:\n"
	@printf "  make install  Install project dependencies\n"
	@printf "  make serve    Start the local dev server\n"
	@printf "  make build    Build the site\n"
	@printf "  make preview  Serve the built site\n"
	@printf "  make check    Type-check the site\n"
	@printf "  make post     Create a new post interactively\n"
	@printf "  make clean    Remove the build output\n"

install:
	npm install

post:
	@./scripts/new-post.sh

serve: guard
	@"$(ASTRO)" dev

build: guard
	@"$(ASTRO)" build

preview: guard
	@"$(ASTRO)" preview

check: guard
	@"$(ASTRO)" check

guard:
	@if [ ! -x "$(ASTRO)" ]; then \
		echo "astro is not installed. Run: make install"; \
		exit 1; \
	fi

clean:
	@if [ -d "build" ]; then \
		rm -rf build; \
		echo "Cleaned build/"; \
	else \
		echo "build/ does not exist"; \
	fi
