import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  /* 
  Test:
  1. Open add customer page by link
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
  2. Fill the First Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup)
  7. Click [Customers] button.
  8. Assert the customer First Name is present in the table in the last row. 
  9. Assert the customer Last Name is present in the table in the last row. 
  10. Assert the customer Postal Code is present in the table in the last row. 
  11. Assert there is no account number for the new customer in the last row. 

  Tips:
  1. Use faker for test data generation, example usage:
    const firstName = faker.person.firstName();
    const lastName = faker.person.LastName();
    const postCode = faker.location.zipCode(); 

  2. Do not rely on the customer row id for the steps 8-11. 
    Use the ".last()" locator to get the last row.
  */
<<<<<<< HEAD
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
=======

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  const bankManagerMainPage = new BankManagerMainPage(page);
>>>>>>> a79f229 (Implement all manager and customer tests)
 
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = faker.location.zipCode();
 
  await addCustomerPage.open();
  await addCustomerPage.addCustomer(firstName, lastName, postalCode);
  await page.reload();
 
<<<<<<< HEAD
  await customersListPage.open();
=======
  await bankManagerMainPage.open();
  await bankManagerMainPage.clickCustomersButton();
>>>>>>> a79f229 (Implement all manager and customer tests)
 
  await customersListPage.assertLastRowContainsFirstName(firstName);
  await customersListPage.assertLastRowContainsLastName(lastName);
  await customersListPage.assertLastRowContainsPostalCode(postalCode);
  await customersListPage.assertLastRowAccountNumberIsEmpty();
});
 