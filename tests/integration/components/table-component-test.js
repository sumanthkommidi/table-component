import { module, test } from 'qunit';
import { setupRenderingTest } from 'table-component/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import TABLE_DATA from './responses/table-data';

module('Integration | Component | table-component', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders correct number of rows and default text is None Selected', async function (assert) {
    this.set('data', TABLE_DATA);

    await render(hbs`<TableComponent @data={{this.data}} />`);

    assert.strictEqual(
      this.element.querySelector('tbody').children.length,
      2,
      'table has 2 rows',
    );
    assert.dom('.selected-text').hasText('None Selected');
  });

  test('Select All Checkbox should not be checked or in intermediate state and text should be None Selected when none of the rows are selected', async function (assert) {
    this.set('data', TABLE_DATA);

    await render(hbs`<TableComponent @data={{this.data}} />`);

    assert.dom('[data-test-select-all]').isNotChecked();
    assert.dom('[data-test-select-all]').doesNotHaveAttribute('indeterminate');
    assert.dom('.selected-text').hasText('None Selected');
  });

  test('checking select all checkbox should check all rows and text should reflect the number of rows selected', async function (assert) {
    this.set('data', TABLE_DATA);

    await render(hbs`<TableComponent @data={{this.data}} />`);

    await click('[data-test-select-all]');

    const checkboxes = this.element.querySelectorAll(
      '[data-test-row-checkbox]',
    );

    checkboxes.forEach((checkbox) => assert.dom(checkbox).isChecked());
    assert.dom('.selected-text').hasText('Selected 2');
  });

  test('selecting all individual checkboxes should select select all checkbox', async function (assert) {
    this.set('data', TABLE_DATA);

    await render(hbs`<TableComponent @data={{this.data}} />`);

    const checkboxes = this.element.querySelectorAll(
      '[data-test-row-checkbox]',
    );

    await click(checkboxes[0]);
    await click(checkboxes[1]);

    assert.dom(checkboxes[0]).isChecked();
    assert.dom(checkboxes[1]).isChecked();

    assert.dom('[data-test-select-all]').isChecked();
    assert.dom('.selected-text').hasText('Selected 2');
  });
});
