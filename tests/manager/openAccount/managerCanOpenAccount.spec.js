import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
 
let firstName;
let lastName;
let postalCode;
 
test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
 
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();
 
  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postalCode);
  await page.reload();
});
 
test('Assert manager can add new customer', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);
 
  await bankManagerMainPage.open();
  await bankManagerMainPage.clickOpenAccountButton();
 
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();
  await page.reload();
 
  await customersListPage.open();
 
  await customersListPage.assertLastRowContainsFirstName(firstName);
  await customersListPage.assertLastRowAccountNumberIsNotEmpty();
});
