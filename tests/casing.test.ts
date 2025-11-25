import { describe, expect, it } from 'vitest';
import { invertCase } from 'src/modules/casing/invertCase';
import { toCamel } from 'src/modules/casing/utils/transformers/toCamel';
import { toConstant } from 'src/modules/casing/utils/transformers/toConstant';
import { toDot } from 'src/modules/casing/utils/transformers/toDot';
import { toKebab } from 'src/modules/casing/utils/transformers/toKebab';
import { toLower } from 'src/modules/casing/utils/transformers/toLower';
import { toPascal } from 'src/modules/casing/utils/transformers/toPascal';
import { toSentence } from 'src/modules/casing/utils/transformers/toSentence';
import { toSnake } from 'src/modules/casing/utils/transformers/toSnake';
import { toTitle } from 'src/modules/casing/utils/transformers/toTitle';
import { toUpper } from 'src/modules/casing/utils/transformers/toUpper';

describe('Casing transformers', () => {
    describe('toCamel', () => {
        it('should transform to camelCase', () => {
            expect(toCamel('hello world')).toBe('helloWorld');
            expect(toCamel('foo-bar')).toBe('fooBar');
            expect(toCamel('baz_qux')).toBe('bazQux');
            expect(toCamel('Hello World')).toBe('helloWorld');
        });
    });

    describe('toSnake', () => {
        it('should transform to snake_case', () => {
            expect(toSnake('hello world')).toBe('hello_world');
            expect(toSnake('fooBar')).toBe('foo_bar');
            expect(toSnake('FooBar')).toBe('foo_bar');
        });
    });

    describe('toKebab', () => {
        it('should transform to kebab-case', () => {
            expect(toKebab('hello world')).toBe('hello-world');
            expect(toKebab('fooBar')).toBe('foo-bar');
            expect(toKebab('FooBar')).toBe('foo-bar');
        });
    });

    describe('toPascal', () => {
        it('should transform to PascalCase', () => {
            expect(toPascal('hello world')).toBe('HelloWorld');
            expect(toPascal('foo-bar')).toBe('FooBar');
            expect(toPascal('baz_qux')).toBe('BazQux');
        });
    });

    describe('toConstant', () => {
        it('should transform to SCREAMING_SNAKE_CASE', () => {
            expect(toConstant('hello world')).toBe('HELLO_WORLD');
            expect(toConstant('fooBar')).toBe('FOO_BAR');
            expect(toConstant('FooBar')).toBe('FOO_BAR');
        });
    });

    describe('toDot', () => {
        it('should transform to dot.case', () => {
            expect(toDot('hello world')).toBe('hello.world');
            expect(toDot('fooBar')).toBe('foo.bar');
        });
    });

    describe('toTitle', () => {
        it('should transform to Title Case', () => {
            expect(toTitle('hello world')).toBe('Hello World');
            expect(toTitle('foo bar baz')).toBe('Foo Bar Baz');
        });
    });

    describe('toSentence', () => {
        it('should transform to Sentence case', () => {
            expect(toSentence('hello world')).toBe('Hello world');
            expect(toSentence('FOO BAR')).toBe('Foo bar');
        });
    });

    describe('toUpper', () => {
        it('should transform to UPPER CASE', () => {
            expect(toUpper('hello world')).toBe('HELLO WORLD');
            expect(toUpper('Foo Bar')).toBe('FOO BAR');
        });
    });

    describe('toLower', () => {
        it('should transform to lower case', () => {
            expect(toLower('HELLO WORLD')).toBe('hello world');
            expect(toLower('Foo Bar')).toBe('foo bar');
        });
    });

    describe('invertCase', () => {
        it('should invert the case of each character', () => {
            expect(invertCase('Hello World')).toBe('hELLO wORLD');
            expect(invertCase('FOO bar')).toBe('foo BAR');
            expect(invertCase('123 abc')).toBe('123 ABC');
        });

        it('should preserve non-alphabetic characters', () => {
            expect(invertCase('Hello123World')).toBe('hELLO123wORLD');
            expect(invertCase('foo-bar_baz')).toBe('FOO-BAR_BAZ');
        });
    });
});
