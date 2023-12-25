#!/bin/bash

include .env

compose_cmd = docker-compose
prisma_cmd  = npx prisma

up:
	@$(compose_cmd) -f docker-compose.yaml up -d

down:
	@$(compose_cmd) down --remove-orphans

migrate:
	@$(prisma_cmd) migrate dev --name init

seed:
	@$(prisma_cmd) db seed