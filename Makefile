# CV Maker - Makefile
# A simple Makefile for common development tasks

.PHONY: help install dev build start lint clean test preview check format deps update

# Default target
help: ## Show this help message
	@echo "CV Maker - Available commands:"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development
install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build the application for production
	npm run build

start: ## Start production server
	npm run start

# Code Quality
lint: ## Run ESLint
	npm run lint

lint-fix: ## Run ESLint with auto-fix
	npx eslint . --fix

format: ## Format code with Prettier (if available)
	@if command -v npx prettier > /dev/null 2>&1; then \
		npx prettier --write .; \
	else \
		echo "Prettier not found. Install with: npm install --save-dev prettier"; \
	fi

check: ## Run all checks (lint)
	make lint

# Testing
test: ## Run tests (if available)
	@if grep -q '"test"' package.json; then \
		npm test; \
	else \
		echo "No test script found in package.json"; \
	fi

# Maintenance
clean: ## Clean node_modules and build artifacts
	rm -rf node_modules
	rm -rf .next
	rm -rf out
	rm -rf dist

deps: ## Show dependency tree
	npm ls

update: ## Update dependencies
	npm update

# Docker (if Dockerfile exists)
docker-build: ## Build Docker image
	@if [ -f Dockerfile ]; then \
		docker build -t cv-maker .; \
	else \
		echo "No Dockerfile found"; \
	fi

docker-run: ## Run Docker container
	@if [ -f Dockerfile ]; then \
		docker run -p 3000:3000 cv-maker; \
	else \
		echo "No Dockerfile found"; \
	fi

# Git helpers
git-status: ## Show git status
	git status

git-log: ## Show recent git commits
	git log --oneline -10

# Project info
info: ## Show project information
	@echo "Project: CV Maker"
	@echo "Node version: $$(node --version)"
	@echo "NPM version: $$(npm --version)"
	@echo "Next.js project structure detected"

# Quick setup for new contributors
setup: ## Quick setup for new contributors
	@echo "Setting up CV Maker development environment..."
	make install
	@echo "✅ Dependencies installed"
	@echo "✅ Run 'make dev' to start development server"
	@echo "✅ Run 'make help' to see all available commands"

# Production deployment helpers
deploy-check: ## Check if ready for deployment
	@echo "Running deployment checks..."
	make lint
	make build
	@echo "✅ All checks passed - ready for deployment"