import { expect } from '@playwright/test';
 
export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.tableBody = page.locator('table tbody');
    this.tableRows = page.locator('table tbody tr');
    this.lastRow = page.locator('table tbody tr').last();
    this.lastRowFirstNameCell = this.lastRow.locator('td').nth(0);
    this.lastRowLastNameCell = this.lastRow.locator('td').nth(1);
    this.lastRowPostalCodeCell = this.lastRow.locator('td').nth(2);
    this.lastRowAccountNumberCell = this.lastRow.locator('td').nth(3);
  }
 
  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
 
  async fillSearchInput(text) {
    await this.searchInput.fill(text);
  }
 
  async getRowByCustomerName(firstName, lastName) {
    return this.page.locator('table tbody tr').filter({ hasText: firstName }).filter({ hasText: lastName });
  }
 
  async clickDeleteForCustomer(firstName, lastName) {
    const row = await this.getRowByCustomerName(firstName, lastName);
    await row.getByRole('button', { name: 'Delete' }).click();
  }
 
  async assertLastRowContainsFirstName(firstName) {
    await expect(this.lastRowFirstNameCell).toContainText(firstName);
  }
 
  async assertLastRowContainsLastName(lastName) {
    await expect(this.lastRowLastNameCell).toContainText(lastName);
  }
 
  async assertLastRowContainsPostalCode(postalCode) {
    await expect(this.lastRowPostalCodeCell).toContainText(postalCode);
  }
 
  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.lastRowAccountNumberCell).toBeEmpty();
  }
 
  async assertLastRowAccountNumberIsNotEmpty() {
    await expect(this.lastRowAccountNumberCell).not.toBeEmpty();
  }
 
  async assertCustomerRowIsVisible(firstName, lastName) {
    const row = await this.getRowByCustomerName(firstName, lastName);
    await expect(row).toBeVisible();
  }
 
  async assertCustomerRowIsHidden(firstName, lastName) {
    const row = await this.getRowByCustomerName(firstName, lastName);
    await expect(row).toHaveCount(0);
  }
 
  async assertOnlyOneRowIsVisible() {
    await expect(this.tableRows).toHaveCount(1);
  }
}
