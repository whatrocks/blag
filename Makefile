.PHONY: post serve build clean

post:
	@./scripts/new-post.sh

serve:
	@if command -v syte >/dev/null 2>&1; then \
		syte serve; \
	else \
		echo "Syte not found. Install with: npm install -g syte@0.0.1-beta.13"; \
	fi

build:
	@if command -v syte >/dev/null 2>&1; then \
		syte build; \
	else \
		echo "Syte not found. Install with: npm install -g syte@0.0.1-beta.13"; \
	fi

clean:
	@if [ -d "dist" ]; then rm -rf dist; echo "✓ Cleaned dist directory"; else echo "No dist directory to clean"; fi