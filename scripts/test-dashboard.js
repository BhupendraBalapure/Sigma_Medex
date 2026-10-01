// Automated Test Suite for Sigma Medex Dashboard & SQLite Backend
const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 STARTING SIGMA MEDEX DASHBOARD & SQLITE TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    console.log('[1/10] Testing API & Database Health Check...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'Health endpoint returns HTTP 200');
    assert(healthData.database.includes('SQLite'), 'Database is reported as SQLite');

    // 2. Fetch Products
    console.log('\n[2/10] Testing Product Catalog Retrieval from SQLite...');
    const prodRes = await fetch(`${BASE_URL}/products`);
    const products = await prodRes.json();
    assert(Array.isArray(products) && products.length >= 8, `Fetched ${products.length} products from SQLite`);

    // 3. Add New Product (CRUD: Create)
    console.log('\n[3/10] Testing Product Creation (Add New Medicine)...');
    const newTestProduct = {
      name: 'OncoTest 50mg Tablet',
      genericName: 'Bortezomib 50mg',
      category: 'Anti-Cancer',
      price: 1850,
      wholesalePrice: 1250,
      moq: 5,
      packSize: 'Vial of 1 Unit',
      manufacturer: 'Sigma Labs',
      prescriptionRequired: true,
      stock: 120,
      description: 'Test oncology drug formulation for hospital procurement test.'
    };

    const addRes = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTestProduct)
    });
    const createdProduct = await addRes.json();
    assert(addRes.status === 201, 'Product created with HTTP 201');
    assert(createdProduct.name === 'OncoTest 50mg Tablet', 'Created product has expected name');
    assert(createdProduct.prescriptionRequired === true, 'Rx required flag properly set');

    // 4. Update Product (CRUD: Update)
    console.log('\n[4/10] Testing Product Modification (Edit Price & Stock)...');
    const updateRes = await fetch(`${BASE_URL}/products/${createdProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: 1750, stock: 250 })
    });
    const updatedProduct = await updateRes.json();
    assert(updateRes.status === 200, 'Product updated with HTTP 200');
    assert(updatedProduct.price === 1750, `Price successfully updated to ₹${updatedProduct.price}`);
    assert(updatedProduct.stock === 250, `Stock successfully updated to ${updatedProduct.stock} units`);

    // 5. Place Customer Order into SQLite
    console.log('\n[5/10] Testing Order Placement into SQLite...');
    const testOrder = {
      id: 'TEST-ORD-' + Date.now().toString().slice(-4),
      customerName: 'Test Hospital Procurement',
      email: 'procurement@testhospital.org',
      phone: '+91 9988776655',
      shippingAddress: 'Gate 2, Civil Lines, Nagpur - 440001',
      gstin: '27AEPFS7579K1ZW',
      total: 3500,
      paymentMethod: 'Wholesale Wire (RTGS)',
      items: [
        { id: createdProduct.id, name: createdProduct.name, quantity: 2, price: 1750 }
      ],
      hasPrescription: true,
      prescriptionFile: 'Dr_Verma_Hospital_Rx.pdf'
    };

    const orderRes = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testOrder)
    });
    const createdOrder = await orderRes.json();
    assert(orderRes.status === 201, 'Order created with HTTP 201');
    assert(createdOrder.id === testOrder.id, `Order ID created: ${createdOrder.id}`);
    assert(createdOrder.orderStatus === 'Confirmed', 'Initial order status is Confirmed');

    // 6. Update Order Status (Dispatch Pipeline)
    console.log('\n[6/10] Testing Order Dispatch Status Workflow...');
    const statusRes = await fetch(`${BASE_URL}/orders/${createdOrder.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Dispatched' })
    });
    const statusData = await statusRes.json();
    assert(statusRes.status === 200, 'Status update returned HTTP 200');
    assert(statusData.status === 'Dispatched', 'Order status moved to Dispatched');

    // 7. Verify Order Persistence in SQLite
    console.log('\n[7/10] Testing Order Query & Verification from SQLite...');
    const fetchOrdersRes = await fetch(`${BASE_URL}/orders`);
    const allOrders = await fetchOrdersRes.json();
    const foundOrder = allOrders.find(o => o.id === createdOrder.id);
    assert(foundOrder !== undefined, 'Order exists in SQLite orders table');
    assert(foundOrder.orderStatus === 'Dispatched', 'Order reflects Dispatched status in database');
    assert(Array.isArray(foundOrder.items) && foundOrder.items.length === 1, 'Order items JSON parsed correctly');

    // 8. B2B Wholesale Inquiry Workflow
    console.log('\n[8/10] Testing Wholesale Inquiry Lead Creation & Status...');
    const inqRes = await fetch(`${BASE_URL}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Semalix Semaglutide 3mg Tablets',
        buyerName: 'Dr. Alok Verma',
        phone: '+91 9123456780',
        city: 'Pune',
        country: 'India',
        quantity: '100 Strips',
        message: 'Need commercial wholesale quote and batch CoA.'
      })
    });
    const inqData = await inqRes.json();
    assert(inqRes.status === 201, 'Wholesale Inquiry logged with HTTP 201');

    const inqPatchRes = await fetch(`${BASE_URL}/inquiries/${inqData.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Quotation Sent' })
    });
    assert(inqPatchRes.status === 200, 'Inquiry status updated to Quotation Sent');

    // 9. Prescription Verification Workflow
    console.log('\n[9/10] Testing Prescription Compliance Audit...');
    const rxRes = await fetch(`${BASE_URL}/prescriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: 'Certified_Doctor_Rx_9901.pdf',
        patientName: 'Sunita Patel',
        doctorName: 'Dr. M. S. Rao, MD',
        notes: 'Verified oncology prescription.'
      })
    });
    const rxData = await rxRes.json();
    assert(rxRes.status === 201, 'Prescription saved to SQLite');

    const rxPatchRes = await fetch(`${BASE_URL}/prescriptions/${rxData.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Verified' })
    });
    assert(rxPatchRes.status === 200, 'Prescription approved & marked Verified');

    // 10. Clean up test product (CRUD: Delete)
    console.log('\n[10/10] Testing Product Deletion (CRUD: Delete)...');
    const delRes = await fetch(`${BASE_URL}/products/${createdProduct.id}`, {
      method: 'DELETE'
    });
    const delData = await delRes.json();
    assert(delRes.status === 200 && delData.success === true, 'Test product deleted successfully from SQLite');

    // Final Report
    console.log('\n====================================================');
    console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED | ${failed} FAILED`);
    if (failed === 0) {
      console.log('🎉 ALL DASHBOARD & SQLITE FEATURES ARE 100% OPERATIONAL!');
    } else {
      console.log('⚠️ Some tests failed. Please review errors above.');
    }
    console.log('====================================================\n');

  } catch (err) {
    console.error('Fatal test error:', err);
  }
}

runTests();
