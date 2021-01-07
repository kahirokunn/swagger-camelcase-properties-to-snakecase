#!/usr/bin/env node

import * as fs from 'fs';
import { swaggerCamelCasePropertiesToSnakeCase } from '../'

const input = fs.readFileSync('/dev/stdin', 'utf8');

console.log(swaggerCamelCasePropertiesToSnakeCase(input))
