/**
 * CODE.GS MASTER INTEGRATED
 * Spreadsheet: 1zyvghNwHEgKuQWdm9rtM9Xed2nDCBO1eb5visFKQ0k0
 * Backend terpadu untuk Login, Register, OTP, Super Admin, Admin,
 * Kasir POS, Akuntan, Manajemen Puncak, Inventory, Accounting,
 * Chat, Approval, Audit dan Dashboard.
 */

const APP = {
  SPREADSHEET_ID: '1zyvghNwHEgKuQWdm9rtM9Xed2nDCBO1eb5visFKQ0k0',
  TZ: 'Asia/Jakarta',
  SESSION_HOURS: 12,
  OTP_MINUTES: 5,
  CACHE_SECONDS: 5,
  MAX_ROWS: 500
};
const SPREADSHEET_ID = APP.SPREADSHEET_ID;

const SCHEMA = {
  Users:['UserID','Email','Password','Name','WhatsApp','Role','CompanyID','Status','CreatedAt','UpdatedAt','LastLogin','ApprovedAt','ApprovedBy'],
  Companies:['CompanyID','CompanyName','Contact','Status','CreatedAt','UpdatedAt'],
  Logs:['LogID','Timestamp','Actor','CompanyID','Action','Details'],
  AuditLogs:['LogID','Timestamp','Actor','CompanyID','Action','RecordID','Details'],
  Modules:['ID','CompanyID','ModuleID','ModuleName','Enabled','CreatedAt','UpdatedAt'],
  Broadcasts:['ID','Date','Title','Message','Target','Status','CreatedAt','CreatedBy'],
  Notifications:['NotificationID','CompanyID','Title','Message','Target','Status','CreatedAt','CreatedBy'],
  Settings:['Key','Value','Description','UpdatedAt'],
  FinancialSnapshots:['Period','CompanyID','Revenue','Expense','Cash','Bank','Receivables','Payables','Assets','Equity','LastUpdated'],
  Approvals:['ApprovalID','Date','RefType','RefID','Requester','Dept','Description','Amount','Status','ApprovalNotes','CompanyID'],
  KPI_Targets:['KPI_ID','Period','Department','IndicatorName','TargetValue','ActualValue','Unit','Status','CompanyID'],
  Budgets:['BudgetID','Period','Department','AllocatedBudget','RealizedAmount','Notes','Status','CompanyID','CreatedAt','UpdatedAt'],
  StrategicPlans:['PlanID','InitiativeName','Description','PIC','TotalBudget','ProgressPct','Deadline','Status','CompanyID','CreatedAt','UpdatedAt'],
  EnterpriseRisks:['RiskID','Date','Category','Description','ImpactLevel','MitigationPlan','Status','CompanyID','CreatedAt','UpdatedAt'],
  Customers:['CustomerID','Name','PIC','Term','CreditLimit','Status','CompanyID','Email','Phone','Address','CreatedAt','UpdatedAt'],
  Vendors:['VendorID','Name','PIC','BankDetails','Status','CompanyID','NPWP','Phone','Email','Address','CreatedAt','UpdatedAt'],
  Products:['ProductID','SKU','Name','Category','Cost','Price','MinStock','MaxStock','CurrentStock','Unit','Icon','Status','CompanyID','CreatedAt','UpdatedAt'],
  Transactions:['TxID','Date','Type','PartyID','Description','Amount','Status','CreatedBy','Cashier','Notes','CompanyID','PaymentMethod','QueueNo','Tax','Discount','GrandTotal','CreatedAt','UpdatedAt'],
  TransactionItems:['ItemID','TxID','SKU','ProductID','ProductName','Qty','UnitPrice','Cost','Discount','Tax','Subtotal','CompanyID','CreatedAt'],
  Tasks:['TaskID','Title','Priority','Deadline','Status','RelatedID','Assignee','CompanyID','CreatedAt','UpdatedAt'],
  ChartOfAccounts:['AccountCode','AccountName','Type','NormalBalance','Balance','Active','CompanyID','CreatedAt','UpdatedAt'],
  Invoices:['InvoiceID','RefTxID','Type','PartyID','IssueDate','DueDate','Total','Outstanding','Status','CreatedBy','CompanyID','CreatedAt','UpdatedAt'],
  Journals:['JournalID','Date','RefID','AccountCode','AccountName','Debit','Credit','Description','CreatedBy','CompanyID','SourceType','CreatedAt'],
  Payments:['PaymentID','Date','InvoiceID','TxID','AccountCode','Amount','Method','ReferenceNo','ProcessedBy','CompanyID','Status','CreatedAt'],
  KasOpname:['OpnameID','Waktu','Kasir','ModalAwal','TunaiSystem','UangFisik','Selisih','CompanyID','CreatedAt'],
  Shifts:['ShiftID','CompanyID','CashierID','CashierName','StartTime','EndTime','OpeningCash','ExpectedCash','ActualCash','Difference','Status','CreatedAt','UpdatedAt'],
  Accounts:['AccountID','CompanyID','DrawerCash','Bank','PettyCash','UpdatedAt'],
  Members:['MemberID','CompanyID','Name','Phone','Email','Address','Points','Status','CreatedAt','UpdatedAt'],
  Anomalies:['AnomalyID','RefID','Type','Description','Clarification','Severity','Status','CompanyID','CreatedAt','UpdatedAt'],
  Chats:['ID','MessageID','Waktu','Pengirim','SenderID','RoleSender','RoleTarget','ReceiverID','Pesan','CompanyID','Status','CreatedAt'],
  Messages:['MessageID','CompanyID','SenderID','SenderName','ReceiverID','Text','Time','Status','CreatedAt'],
  Expenses:['ExpenseID','CompanyID','Date','Amount','Description','Category','CreatedBy','Status','CreatedAt'],
  Directives:['DirectiveID','CompanyID','Recipient','Message','Sender','Status','CreatedAt'],
  Reimbursements:['ReimbursementID','CompanyID','Requester','Description','Amount','Status','ApprovedBy','CreatedAt','UpdatedAt'],
  Documents:['DocumentID','CompanyID','RecordID','DocumentType','FileName','FileUrl','Status','UploadedBy','CreatedAt'],
  OTP:['Email','OTP','Purpose','ExpiresAt','Verified','CreatedAt'],
  Sessions:['Token','UserID','Email','Role','CompanyID','CreatedAt','ExpiresAt','Status'],
  Departments:['DepartmentID','CompanyID','DepartmentName','Manager','Budget','Status','CreatedAt','UpdatedAt'],
  Employees:['EmployeeID','CompanyID','Name','Email','Phone','DepartmentID','Position','JoinDate','EmploymentStatus','BasicSalary','Status','CreatedAt','UpdatedAt'],
  Payroll:['PayrollID','CompanyID','EmployeeID','Period','BasicSalary','Allowance','Deduction','NetSalary','Status','ApprovedBy','CreatedAt','UpdatedAt'],
  PurchaseOrders:['POID','CompanyID','VendorID','Date','DueDate','Total','Status','CreatedBy','Notes','CreatedAt','UpdatedAt'],
  SalesOrders:['SOID','CompanyID','CustomerID','Date','DueDate','Total','Status','CreatedBy','Notes','CreatedAt','UpdatedAt'],
  Warehouses:['WarehouseID','CompanyID','WarehouseName','Location','PIC','Status','CreatedAt','UpdatedAt'],
  StockMovements:['MovementID','CompanyID','ProductID','WarehouseID','Type','Qty','ReferenceID','UnitCost','Date','CreatedBy','Notes','CreatedAt'],
  FixedAssets:['AssetID','CompanyID','AssetName','Category','AcquisitionDate','AcquisitionCost','UsefulLifeMonths','AccumulatedDepreciation','BookValue','Status','CreatedAt','UpdatedAt'],
  TaxRecords:['TaxID','CompanyID','Period','TaxType','TaxBase','TaxAmount','Status','ReferenceID','CreatedAt','UpdatedAt'],
  FiscalPeriods:['PeriodID','CompanyID','Period','StartDate','EndDate','Status','ClosedBy','ClosedAt'],
  BankReconciliations:['ReconID','CompanyID','Period','AccountCode','BookBalance','BankBalance','Difference','Status','Notes','CreatedAt','UpdatedAt'],
  IntegrationEvents:['EventID','CompanyID','EventType','SourceRole','RefID','Status','Payload','CreatedAt'],
  CompanyProfiles:['CompanyProfileID','CompanyID','LegalName','Industry','Address','City','Province','Phone','Email','Website','NPWP','NIB','Currency','TaxStatus','Status','CreatedAt','UpdatedAt'],
  Quotations:['QuotationID','CompanyID','CustomerID','Date','ValidUntil','Total','Status','Notes','CreatedBy','CreatedAt','UpdatedAt'],
  Deliveries:['DeliveryID','CompanyID','SOID','CustomerID','Date','Status','DeliveredBy','Notes','CreatedAt','UpdatedAt'],
  Contracts:['ContractID','CompanyID','CounterpartyType','CounterpartyID','ContractNo','Title','StartDate','EndDate','Value','RenewalNoticeDays','PIC','Status','Notes','CreatedAt','UpdatedAt'],
  ComplianceCalendar:['ComplianceID','CompanyID','EventDate','Category','Title','Owner','Priority','Status','Reference','Notes','CreatedAt','UpdatedAt'],
  Policies:['PolicyID','CompanyID','PolicyCode','Title','Category','EffectiveDate','ReviewDate','Owner','Status','DocumentUrl','Notes','CreatedAt','UpdatedAt'],
  ApprovalMatrices:['MatrixID','CompanyID','ProcessType','MinAmount','MaxAmount','ApproverRole','Sequence','Active','CreatedAt','UpdatedAt'],
  Attendance:['AttendanceID','CompanyID','EmployeeID','Date','ClockIn','ClockOut','WorkHours','Status','Notes','CreatedAt','UpdatedAt'],
  LeaveRequests:['LeaveID','CompanyID','EmployeeID','StartDate','EndDate','LeaveType','Reason','Approver','Status','CreatedAt','UpdatedAt'],
  PerformanceReviews:['ReviewID','CompanyID','EmployeeID','Period','Score','KPI','Reviewer','Status','Notes','CreatedAt','UpdatedAt'],
  ServiceRequests:['ServiceRequestID','CompanyID','Category','Title','Description','Priority','Requester','Assignee','Deadline','Status','CreatedAt','UpdatedAt'],
  AssetRequests:['AssetRequestID','CompanyID','Department','Item','Qty','EstimatedCost','Requester','Priority','Status','CreatedAt','UpdatedAt'],
  CashierNotes:['NoteID','CompanyID','NoteType','RefID','Message','CreatedBy','CreatedAt','Status']
};

function doGet(e){
  var p=e&&e.parameter?e.parameter:{};
  var action=p.action||p.api;
  if(action){try{return out_(handleApiRequest(action,p,null));}catch(x){return out_({success:false,error:x.message});}}
  var pages=['Login','Register','LupaPassword','Superadmin','Adminperusahaan','Kasir','Akuntan','Manajemenpuncak'];
  var page=pages.indexOf(p.page||'Login')>=0?(p.page||'Login'):'Login';
  try{
    return HtmlService.createTemplateFromFile(page).evaluate()
      .setTitle('Enterprise System - '+page)
      .addMetaTag('viewport','width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }catch(e2){
    return HtmlService.createHtmlOutput('<h2>Halaman tidak ditemukan</h2><p>'+html_(e2.message)+'</p>');
  }
}
function doPost(e){
  var p=e&&e.parameter?e.parameter:{}, b=null;
  if(e&&e.postData&&e.postData.contents){try{b=JSON.parse(e.postData.contents);}catch(_) {b=e.postData.contents;}}
  var a=p.action||p.api||(b&&b.action);
  if(!a)return out_({success:false,error:'action/api wajib diisi'});
  try{return out_(handleApiRequest(a,p,b));}catch(x){return out_({success:false,error:x.message});}
}
function getScriptUrl(){return ScriptApp.getService().getUrl();}

function getDB(){return SpreadsheetApp.openById(APP.SPREADSHEET_ID);}
function getOrCreateSheet(n){
  var ss=getDB(), sh=ss.getSheetByName(n);
  if(!sh){sh=ss.insertSheet(n);var h=SCHEMA[n]||['ID','Data','CreatedAt'];sh.getRange(1,1,1,h.length).setValues([h]);formatHeader_(sh);}
  else ensureHeaders_(sh,SCHEMA[n]||[]);
  return sh;
}
function ensureHeaders_(sh,required){
  if(!required.length)return;
  var cur=sh.getRange(1,1,Math.max(1,sh.getLastColumn())).getValues()[0].map(String);
  var miss=required.filter(function(x){return cur.indexOf(x)<0;});
  if(miss.length)sh.getRange(1,cur.length+1,1,miss.length).setValues([miss]);
  sh.setFrozenRows(1);formatHeader_(sh);
}
function formatHeader_(sh){sh.getRange(1,1,1,sh.getLastColumn()).setFontWeight('bold').setBackground('#1e293b').setFontColor('#fff');sh.setFrozenRows(1);}
function rows_(n,useCache){
  var key='R_'+n;
  if(useCache!==false){var c=cacheGet_(key);if(c!==null)return c;}
  var sh=getOrCreateSheet(n);if(sh.getLastRow()<=1){if(useCache!==false)cachePut_(key,[]);return[];}
  var v=sh.getDataRange().getValues(), h=v[0].map(String), out=[];
  for(var i=1;i<v.length;i++){if(v[i].some(function(x){return String(x).trim()!=='';})){var o={};h.forEach(function(k,j){o[k]=cell_(v[i][j]);});out.push(o);}}
  if(useCache!==false)cachePut_(key,out);return out;
}
function append_(n,o,doInvalidate){
  var sh=getOrCreateSheet(n),h=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);
  var miss=Object.keys(o||{}).filter(function(k){return h.indexOf(k)<0;});
  if(miss.length){sh.getRange(1,h.length+1,1,miss.length).setValues([miss]);h=h.concat(miss);formatHeader_(sh);}
  sh.getRange(sh.getLastRow()+1,1,1,h.length).setValues([h.map(function(k){return o[k]===undefined?'':o[k];})]);
  if(doInvalidate!==false)invalidate_(n);return o;
}
function update_(n,idHead,idVal,patch,doInvalidate){
  var sh=getOrCreateSheet(n),v=sh.getDataRange().getValues();if(v.length<=1)return false;var h=v[0].map(String),c=h.indexOf(idHead);if(c<0)throw Error('Kolom '+idHead+' tidak ditemukan');
  for(var r=1;r<v.length;r++)if(String(v[r][c])===String(idVal)){Object.keys(patch||{}).forEach(function(k){var j=h.indexOf(k);if(j>=0)v[r][j]=patch[k];});sh.getRange(r+1,1,1,h.length).setValues([v[r]]);if(doInvalidate!==false)invalidate_(n);return true;}return false;
}
function updateByKeys_(n,keys,patch,doInvalidate){
  var sh=getOrCreateSheet(n),v=sh.getDataRange().getValues();if(v.length<=1)return false;var h=v[0].map(String),idx={};Object.keys(keys||{}).forEach(function(k){idx[k]=h.indexOf(k);if(idx[k]<0)throw Error('Kolom '+k+' tidak ditemukan pada '+n);});
  for(var r=1;r<v.length;r++){var ok=true;Object.keys(keys).forEach(function(k){if(String(v[r][idx[k]])!==String(keys[k]))ok=false;});if(ok){Object.keys(patch||{}).forEach(function(k){var j=h.indexOf(k);if(j>=0)v[r][j]=patch[k];});sh.getRange(r+1,1,1,h.length).setValues([v[r]]);if(doInvalidate!==false)invalidate_(n);return true;}}return false;
}
function del_(n,idHead,idVal,doInvalidate){var sh=getOrCreateSheet(n),v=sh.getDataRange().getValues(),h=v[0].map(String),c=h.indexOf(idHead);if(c<0)return false;for(var r=v.length-1;r>=1;r--)if(String(v[r][c])===String(idVal)){sh.deleteRow(r+1);if(doInvalidate!==false)invalidate_(n);return true;}return false;}
function touchSyncVersions_(sheetName){
  try{
    var sp=PropertiesService.getScriptProperties(),now=String(Date.now());
    var comm=['Chats','Messages','Broadcasts','Notifications','Settings'].indexOf(sheetName)>=0;
    if(comm) sp.setProperty('ERP_COMM_VERSION',now);
    else sp.setProperty('ERP_DATA_VERSION',now);
  }catch(_){}
}
function getSyncStateForUser(user){
  var sp=PropertiesService.getScriptProperties();
  return {success:true,serverTime:now_(),dataVersion:sp.getProperty('ERP_DATA_VERSION')||'0',commVersion:sp.getProperty('ERP_COMM_VERSION')||'0',companyId:user.CompanyID||'SYSTEM',role:String(user.Role||'').toUpperCase()};
}
function invalidate_(n){cacheRemove_('R_'+n);cacheRemove_('ALL');cacheRemove_('INIT');touchSyncVersions_(n);}
function invalidateCompany_(id){['Products','Transactions','TransactionItems','Payments','Journals','Accounts','Expenses','Approvals','Budgets','Chats','Messages','Members','Tasks','Customers','Vendors','Anomalies','Reimbursements','Directives','FinancialSnapshots','Employees','Payroll','PurchaseOrders','SalesOrders','Warehouses','StockMovements','FixedAssets','TaxRecords','FiscalPeriods','BankReconciliations','IntegrationEvents','CompanyProfiles','Quotations','Deliveries','Contracts','ComplianceCalendar','Policies','ApprovalMatrices','Attendance','LeaveRequests','PerformanceReviews','ServiceRequests','AssetRequests','CashierNotes'].forEach(invalidate_);if(id){cacheRemove_('EXEC_'+id);cacheRemove_('ADMIN_'+id);cacheRemove_('INIT_'+id);cacheRemove_('ROLE_'+id);}}

function cacheGet_(k){try{var s=CacheService.getScriptCache().get(k);return s===null?null:JSON.parse(s);}catch(_){return null;}}
function cachePut_(k,v){try{CacheService.getScriptCache().put(k,JSON.stringify(v),APP.CACHE_SECONDS);}catch(_){}}
function cacheRemove_(k){try{CacheService.getScriptCache().remove(k);}catch(_){}}

function setupDatabase(){
  Object.keys(SCHEMA).forEach(getOrCreateSheet);
  var sp=PropertiesService.getScriptProperties();
  if(!sp.getProperty('ERP_DATA_VERSION')) sp.setProperty('ERP_DATA_VERSION',String(Date.now()));
  if(!sp.getProperty('ERP_COMM_VERSION')) sp.setProperty('ERP_COMM_VERSION',String(Date.now()));
  seedCompanies_();seedUsers_();seedModules_();seedCoa_();seedAccounts_();seedSettings_();
  return {success:true,message:'Database master siap digunakan',spreadsheetId:APP.SPREADSHEET_ID,sheets:Object.keys(SCHEMA)};
}
function setupSystem(){return setupDatabase();}
function seedCompanies_(){
  if(rows_('Companies',false).length)return;
  append_('Companies',{CompanyID:'SYSTEM',CompanyName:'Induk Perusahaan Pusat',Contact:'',Status:'AKTIF',CreatedAt:now_(),UpdatedAt:now_()});
  append_('Companies',{CompanyID:'COMP-001',CompanyName:'PT Nusantara Mandiri',Contact:'',Status:'AKTIF',CreatedAt:now_(),UpdatedAt:now_()});
}
function seedUsers_(){
  if(rows_('Users',false).length)return;
  [['admin@system.com','admin123','Default Superadmin','','SUPER_ADMIN','SYSTEM'],
   ['kasir@system.com','kasir123','Kasir Utama','081234567890','KASIR','COMP-001'],
   ['akuntan@system.com','akuntan123','Akuntan Perusahaan','081987654321','AKUNTAN','COMP-001'],
   ['adminperusahaan@system.com','admin123','Admin Perusahaan','','ADMIN_PERUSAHAAN','COMP-001'],
   ['manajemen@system.com','admin123','Manajemen Puncak','','MANAJEMEN_PUNCAK','COMP-001']
  ].forEach(function(u){append_('Users',{UserID:uid_('USR'),Email:u[0],Password:hash_(u[1]),Name:u[2],WhatsApp:u[3],Role:u[4],CompanyID:u[5],Status:'AKTIF',CreatedAt:now_(),UpdatedAt:now_(),LastLogin:'',ApprovedAt:now_(),ApprovedBy:'SYSTEM'});});
}
function seedModules_(){if(rows_('Modules',false).length)return;[['DASHBOARD','Dashboard'],['POS','Point of Sale'],['SALES','Penjualan'],['PURCHASING','Pembelian'],['EXPENSE','Pengeluaran'],['INVENTORY','Persediaan'],['CUSTOMER','Customer'],['VENDOR','Vendor'],['ACCOUNTING','Akuntansi'],['TAX','Perpajakan'],['FINANCIAL_REPORT','Laporan Keuangan'],['AUDIT','Audit Trail'],['APPROVAL','Approval'],['MESSAGING','Messaging'],['EXECUTIVE','Executive Dashboard']].forEach(function(m){append_('Modules',{ID:uid_('MOD'),CompanyID:'COMP-001',ModuleID:m[0],ModuleName:m[1],Enabled:'TRUE',CreatedAt:now_(),UpdatedAt:now_()});});}
function seedCoa_(){if(rows_('ChartOfAccounts',false).length)return;[['1101','Kas Laci','ASET','DEBIT'],['1102','Bank','ASET','DEBIT'],['1103','Kas Kecil','ASET','DEBIT'],['1201','Piutang Usaha','ASET','DEBIT'],['1301','Persediaan','ASET','DEBIT'],['2101','Utang Usaha','LIABILITAS','CREDIT'],['3101','Modal','EKUITAS','CREDIT'],['4101','Penjualan','PENDAPATAN','CREDIT'],['5101','Harga Pokok Penjualan','BEBAN','DEBIT'],['6101','Beban Operasional','BEBAN','DEBIT'],['6102','Beban Gaji','BEBAN','DEBIT']].forEach(function(x){append_('ChartOfAccounts',{AccountCode:x[0],AccountName:x[1],Type:x[2],NormalBalance:x[3],Balance:0,Active:'TRUE',CompanyID:'COMP-001',CreatedAt:now_(),UpdatedAt:now_()});});}
function seedAccounts_(){rows_('Companies',false).forEach(function(c){ensureAccount_(c.CompanyID);});}
function seedSettings_(){if(rows_('Settings',false).length)return;[['MAINTENANCE_MODE','FALSE'],['BROADCAST_MSG',''],['CURRENCY','IDR'],['DEFAULT_COMPANY','COMP-001'],['SESSION_HOURS',String(APP.SESSION_HOURS)],['OTP_MINUTES',String(APP.OTP_MINUTES)]].forEach(function(x){append_('Settings',{Key:x[0],Value:x[1],Description:'',UpdatedAt:now_()});});}

function loginUser(email,password){
  email=normEmail_(email);password=String(password||'');if(!email||!password)throw Error('Email dan password wajib diisi.');
  var u=rows_('Users',false).find(function(x){return normEmail_(x.Email)===email;});
  if(!u||String(u.Status).toUpperCase()!=='AKTIF'||!verify_(password,u.Password))throw Error('Email atau password salah.');
  var route=route_(u.Role);if(!route)throw Error('Role pengguna tidak valid.');
  var token=session_(u);update_('Users','UserID',u.UserID,{LastLogin:now_(),UpdatedAt:now_()});audit_(u.Name,'LOGIN','Login sebagai '+u.Role,u.CompanyID,u.UserID);
  var baseUrl=getScriptUrl();
  if(!baseUrl) throw Error('URL Web App belum tersedia. Deploy project sebagai Web App terlebih dahulu.');
  return {success:true,token:token,route:route,baseUrl:baseUrl,redirectUrl:baseUrl+'?page='+encodeURIComponent(route),userData:userOut_(u),user:userOut_(u)};
}
function session_(u){var t=Utilities.getUuid()+'-'+Utilities.getUuid(),e=new Date(Date.now()+APP.SESSION_HOURS*3600000);append_('Sessions',{Token:t,UserID:u.UserID,Email:u.Email,Role:u.Role,CompanyID:u.CompanyID||'-',CreatedAt:now_(),ExpiresAt:e.toISOString(),Status:'ACTIVE'});return t;}
function logoutUser(t){if(!t)return{success:true};var s=rows_('Sessions',false).find(function(x){return String(x.Token)===String(t);});if(s)update_('Sessions','Token',t,{Status:'LOGGED_OUT'});return{success:true};}
function getSessionUser(t){if(!t)return null;var s=rows_('Sessions',false).find(function(x){return String(x.Token)===String(t)&&x.Status==='ACTIVE'&&new Date(x.ExpiresAt).getTime()>Date.now();});if(!s)return null;var u=rows_('Users',false).find(function(x){return String(x.UserID)===String(s.UserID);});return u?userOut_(u):null;}

function RegisterUser(f){
  if(!f)throw Error('Data registrasi tidak diterima.');var email=normEmail_(f.email),name=String(f.name||'').trim(),wa=String(f.wa||'').trim(),pass=String(f.password||'');
  if(!email||!name||!wa||!pass)throw Error('Semua bidang wajib diisi.');if(pass.length<6)throw Error('Password minimal 6 karakter.');
  if(rows_('Users',false).some(function(u){return normEmail_(u.Email)===email;}))throw Error('Email sudah terdaftar!');
  append_('Users',{UserID:uid_('USR'),Email:email,Password:hash_(pass),Name:name,WhatsApp:wa,Role:'PENDING',CompanyID:'-',Status:'SUSPENDED',CreatedAt:now_(),UpdatedAt:now_(),LastLogin:'',ApprovedAt:'',ApprovedBy:''});
  audit_(name,'REGISTER','Registrasi baru', 'SYSTEM',email);
  try{MailApp.sendEmail(email,'Registrasi Berhasil - Menunggu Aktivasi','Halo '+name+', akun Anda berhasil dibuat dan menunggu aktivasi Superadmin.');}catch(_){}
  return {success:true,message:'Registrasi berhasil! Menunggu aktivasi Superadmin.',triggerEmail:email};
}
function triggerPendingEmail(email){return{success:true,email:email||''};}
function requestResetOTP(email){
  email=normEmail_(email);var u=rows_('Users',false).find(function(x){return normEmail_(x.Email)===email;});if(!u)return{success:true};
  var otp=String(Math.floor(100000+Math.random()*900000)),ex=new Date(Date.now()+APP.OTP_MINUTES*60000).toISOString();
  append_('OTP',{Email:email,OTP:otp,Purpose:'PASSWORD_RESET',ExpiresAt:ex,Verified:'NO',CreatedAt:now_()});
  MailApp.sendEmail(email,'Kode OTP Reset Password','Kode OTP Anda: '+otp+'\nBerlaku '+APP.OTP_MINUTES+' menit.');return{success:true};
}
function verifyResetOTP(email,otp){
  var r=rows_('OTP',false).reverse().find(function(x){return normEmail_(x.Email)===normEmail_(email)&&String(x.OTP)===String(otp)&&x.Verified==='NO';});
  if(!r||new Date(r.ExpiresAt).getTime()<Date.now())throw Error('OTP salah atau sudah kedaluwarsa.');updateOtp_(email,otp,{Verified:'YES'});return{success:true};
}
function saveNewPassword(email,otp,newPass){
  if(String(newPass||'').length<6)throw Error('Password minimal 6 karakter.');
  var r=rows_('OTP',false).reverse().find(function(x){return normEmail_(x.Email)===normEmail_(email)&&String(x.OTP)===String(otp)&&x.Verified==='YES';});if(!r)throw Error('OTP belum diverifikasi.');
  var u=rows_('Users',false).find(function(x){return normEmail_(x.Email)===normEmail_(email);});if(!u)throw Error('User tidak ditemukan.');
  update_('Users','UserID',u.UserID,{Password:hash_(newPass),UpdatedAt:now_()});revoke_(email);updateOtp_(email,otp,{Verified:'USED'});audit_(u.Name,'PASSWORD_RESET','Password direset via OTP','SYSTEM',u.UserID);return{success:true};
}
function triggerPasswordReset(email){var u=rows_('Users',false).find(function(x){return normEmail_(x.Email)===normEmail_(email);});if(!u)throw Error('User tidak ditemukan.');var p=randomPass_();update_('Users','UserID',u.UserID,{Password:hash_(p),UpdatedAt:now_()});MailApp.sendEmail(email,'Password Baru','Password baru Anda: '+p);return{success:true};}
function updateOtp_(email,otp,p){var sh=getOrCreateSheet('OTP'),v=sh.getDataRange().getValues(),h=v[0].map(String),ce=h.indexOf('Email'),co=h.indexOf('OTP');for(var r=v.length-1;r>=1;r--)if(normEmail_(v[r][ce])===normEmail_(email)&&String(v[r][co])===String(otp)){Object.keys(p).forEach(function(k){var c=h.indexOf(k);if(c>=0)sh.getRange(r+1,c+1).setValue(p[k]);});invalidate_('OTP');return true;}return false;}

function getAllData(){
  var c=cacheGet_('ALL');if(c)return c;
  var d={companies:rows_('Companies'),users:rows_('Users').map(userOut_),logs:rows_('Logs').slice(-APP.MAX_ROWS).reverse(),audit:rows_('AuditLogs').slice(-APP.MAX_ROWS).reverse(),modules:rows_('Modules'),notifications:rows_('Broadcasts').slice(-200).reverse(),settings:rows_('Settings'),status:'ok',serverTime:now_()};cachePut_('ALL',d);return d;
}
function refreshData(){cacheRemove_('ALL');Object.keys(SCHEMA).forEach(function(n){invalidate_(n);});return getAllData();}
function saveCompanyRecord(id,name,contact){
  name=String(name||'').trim();if(!name)throw Error('Nama perusahaan wajib diisi.');
  if(id){update_('Companies','CompanyID',id,{CompanyName:name,Contact:contact||'',UpdatedAt:now_()});ensureAccount_(id);}
  else{id='COMP-'+Date.now();append_('Companies',{CompanyID:id,CompanyName:name,Contact:contact||'',Status:'AKTIF',CreatedAt:now_(),UpdatedAt:now_()});ensureAccount_(id);}
  audit_('Superadmin','SAVE_COMPANY',id,'SYSTEM',id);return getAllData();
}
function changeCompanyStatus(id,s){update_('Companies','CompanyID',id,{Status:String(s).toUpperCase(),UpdatedAt:now_()});return getAllData();}
function deleteCompanyRecord(id){if(id==='SYSTEM')throw Error('Company SYSTEM tidak boleh dihapus.');del_('Companies','CompanyID',id);return getAllData();}
function saveUserRecord(mode,orig,data){
  data=data||{};if(String(mode).toLowerCase()==='edit'){var u=rows_('Users',false).find(function(x){return normEmail_(x.Email)===normEmail_(orig);});if(!u)throw Error('User tidak ditemukan.');var p={Email:normEmail_(data.email),Name:data.name,WhatsApp:data.wa||'',Role:data.role||u.Role,CompanyID:data.comp||data.companyId||u.CompanyID,Status:data.status||u.Status,UpdatedAt:now_()};if(data.password)p.Password=hash_(data.password);update_('Users','UserID',u.UserID,p);}
  else append_('Users',{UserID:uid_('USR'),Email:normEmail_(data.email),Password:hash_(data.password||randomPass_()),Name:data.name,WhatsApp:data.wa||'',Role:data.role||'AKUNTAN',CompanyID:data.comp||data.companyId||'COMP-001',Status:data.status||'AKTIF',CreatedAt:now_(),UpdatedAt:now_(),LastLogin:'',ApprovedAt:now_(),ApprovedBy:'SUPER_ADMIN'});
  return getAllData();
}
function changeUserStatus(email,s){var u=rows_('Users',false).find(function(x){return normEmail_(x.Email)===normEmail_(email);});if(!u)throw Error('User tidak ditemukan.');s=String(s).toUpperCase();update_('Users','UserID',u.UserID,{Status:s,UpdatedAt:now_(),ApprovedBy:'SUPER_ADMIN'});if(s!=='AKTIF')revoke_(email);return getAllData();}
function deleteUserRecord(email){var u=rows_('Users',false).find(function(x){return normEmail_(x.Email)===normEmail_(email);});if(u)del_('Users','UserID',u.UserID);revoke_(email);return getAllData();}
function saveModules(comp,selected){selected=Array.isArray(selected)?selected:[];rows_('Modules',false).filter(function(x){return String(x.CompanyID)===String(comp);}).forEach(function(x){del_('Modules','ID',x.ID);});selected.forEach(function(m){append_('Modules',{ID:uid_('MOD'),CompanyID:comp,ModuleID:typeof m==='object'?(m.ModuleID||m.id):m,ModuleName:'',Enabled:'TRUE',CreatedAt:now_(),UpdatedAt:now_()});});return getAllData();}
function saveSettings(p){Object.keys(p||{}).forEach(function(k){upsertSetting_(k,p[k]);});return getAllData();}
function addBroadcast(title,msg,target){audit_('Superadmin','BROADCAST_SEND',String(title||'Broadcast')+' -> '+String(target||'ALL'),'SYSTEM','BROADCAST');append_('Broadcasts',{ID:'BRD-'+Date.now(),Date:date_(),Title:title||'Broadcast',Message:msg||'',Target:target||'ALL',Status:'ACTIVE',CreatedAt:now_(),CreatedBy:'SUPER_ADMIN'});append_('Notifications',{NotificationID:uid_('NOTIF'),CompanyID:target||'ALL',Title:title||'Broadcast',Message:msg||'',Target:target||'ALL',Status:'ACTIVE',CreatedAt:now_(),CreatedBy:'SUPER_ADMIN'});return getAllData();}
function deleteBroadcast(id){update_('Broadcasts','ID',id,{Status:'DELETED'});invalidate_('Broadcasts');audit_('Superadmin','BROADCAST_DELETE',String(id),'SYSTEM',String(id));return getAllData();}
function exportData(t){var d=getAllData();if(t==='full')return JSON.stringify(d,null,2);if(t==='companies')return csv_(d.companies);if(t==='users')return csv_(d.users);return'';}
function setMaintenanceMode(on,msg){var enabled=!!on;upsertSetting_('MAINTENANCE_MODE',enabled?'TRUE':'FALSE');if(msg!==undefined)upsertSetting_('BROADCAST_MSG',String(msg||''));upsertSetting_('MaintenanceMode',enabled?'TRUE':'FALSE');if(msg!==undefined)upsertSetting_('MaintenanceMsg',String(msg||''));audit_('Superadmin','MAINTENANCE_MODE',enabled?'AKTIF':'NONAKTIF','SYSTEM','MAINTENANCE');invalidate_('Settings');invalidate_('ALL');return getMaintenanceStatus();}
function getMaintenanceStatus(){var s=rows_('Settings'),g=function(k){var x=s.find(function(y){return y.Key===k;});return x?x.Value:'';};return{isUnderMaintenance:String(g('MAINTENANCE_MODE')).toUpperCase()==='TRUE',noticeText:g('BROADCAST_MSG')||'Sistem sedang dalam mode Pemeliharaan.'};}

function getInitialData(){
  var c=cacheGet_('INIT');if(c)return c;
  var d={users:rows_('Users').map(userOut_),products:rows_('Products').map(prodOut_),messages:rows_('Messages').slice(-200),chats:rows_('Chats').slice(-200),accounts:getAccounts_('SYSTEM'),members:rows_('Members').slice(-500),history:rows_('Transactions').slice(-APP.MAX_ROWS).reverse().map(txOut_),transactions:rows_('Transactions').slice(-APP.MAX_ROWS).reverse().map(txOut_),companies:rows_('Companies'),maintenance:getMaintenanceStatus(),serverTime:now_()};cachePut_('INIT',d);return d;
}
function getCompanyInitialData(id){var key='INIT_'+(id||'SYSTEM'),c=cacheGet_(key);if(c)return c;var f=function(a){return(id&&id!=='SYSTEM')?a.filter(function(x){return String(x.CompanyID)===String(id);}):a;};var d={users:f(rows_('Users')).map(userOut_),products:f(rows_('Products')).map(prodOut_),messages:f(rows_('Messages')).slice(-200),chats:f(rows_('Chats')).slice(-200),accounts:getAccounts_(id||'SYSTEM'),members:f(rows_('Members')),history:f(rows_('Transactions')).slice(-APP.MAX_ROWS).reverse().map(txOut_),transactions:f(rows_('Transactions')).slice(-APP.MAX_ROWS).reverse().map(txOut_),companies:rows_('Companies'),maintenance:getMaintenanceStatus(),serverTime:now_()};cachePut_(key,d);return d;}

function getProductsData(companyId){return rows_('Products').filter(function(p){return companyId==='SYSTEM'||String(p.CompanyID)===String(companyId);}).filter(function(p){return String(p.Status).toUpperCase()!=='INACTIVE';}).map(prodOut_);}
function saveProduct(p){
  p=p||{};var companyId=String(p.companyId||p.CompanyID||'SYSTEM');if(!companyId)throw Error('CompanyID wajib diisi.');
  var id=String(p.id||p.ProductID||'').trim()||uid_('PROD'),all=rows_('Products',false),ex=all.find(function(x){return String(x.ProductID)===id&&String(x.CompanyID)===companyId;});
  var r={ProductID:id,SKU:String(p.sku||p.SKU||'').trim(),Name:String(p.name||p.Name||'').trim(),Category:p.category||p.Category||'UMUM',Cost:num_(p.cost!==undefined?p.cost:p.Cost),Price:num_(p.price!==undefined?p.price:p.Price),MinStock:num_(p.minStock!==undefined?p.minStock:p.MinStock),MaxStock:num_(p.maxStock!==undefined?p.maxStock:p.MaxStock),CurrentStock:p.stock!==undefined?num_(p.stock):num_(p.currentStock!==undefined?p.currentStock:(ex?ex.CurrentStock:0)),Unit:p.unit||p.Unit||'pcs',Icon:p.icon||'📦',Status:String(p.status||p.Status||'AKTIF').toUpperCase(),CompanyID:companyId,CreatedAt:ex&&ex.CreatedAt?ex.CreatedAt:now_(),UpdatedAt:now_()};
  if(!r.SKU||!r.Name)throw Error('SKU dan nama produk wajib diisi.');
  if(all.some(function(x){return String(x.CompanyID)===companyId&&String(x.SKU||'').toUpperCase()===r.SKU.toUpperCase()&&String(x.ProductID)!==id;}))throw Error('SKU '+r.SKU+' sudah terdaftar.');
  if(ex)updateByKeys_('Products',{ProductID:id,CompanyID:companyId},r,false);else append_('Products',r,false);invalidateCompany_(companyId);return{success:true,duplicate:!!ex,product:prodOut_(r)};
}

function saveTransaction(d,companyId,user){
  d=d||{};user=user||{};var companyId2=String(user.CompanyID||companyId||d.companyId||d.CompanyID||'SYSTEM');if(!companyId2||companyId2==='SYSTEM')throw Error('CompanyID Kasir tidak valid.');
  var role=String(user.Role||'').toUpperCase();if(role&&['KASIR','ADMIN_PERUSAHAAN','SUPER_ADMIN'].indexOf(role)<0)throw Error('Role tidak diizinkan membuat transaksi penjualan.');
  var cashier=String(user.Name||user.Email||d.cashier||'Kasir'),txId=String(d.id||d.TxID||'').trim()||uid_('TRX'),lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    var old=rows_('Transactions',false).find(function(t){return String(t.TxID)===txId&&String(t.CompanyID)===companyId2;});if(old)return{success:true,duplicate:true,txId:txId,transaction:txOut_(old),approval:rows_('Approvals',false).filter(function(a){return String(a.RefID)===txId;}).slice(-1)[0]||null,accounts:getAccounts_(companyId2)};
    var raw=Array.isArray(d.items)?d.items:[];if(!raw.length)throw Error('Transaksi tidak memiliki item. Pilih minimal satu produk.');
    var products=rows_('Products',false),norm=[];raw.forEach(function(i){i=i||{};var id=String(i.productId||i.ProductID||i.id||'').trim(),sku=String(i.sku||i.SKU||'').trim();var p=products.find(function(x){return String(x.CompanyID)===companyId2&&((id&&String(x.ProductID)===id)||(sku&&String(x.SKU).toUpperCase()===sku.toUpperCase()));});if(!p)throw Error('Produk tidak ditemukan. ProductID/SKU: '+(id||sku||'(kosong)'));var q=num_(i.qty!==undefined?i.qty:i.Qty);if(q<=0)throw Error('Qty harus lebih dari 0 untuk '+p.Name+'.');if(num_(p.CurrentStock)<q)throw Error('Stok tidak mencukupi untuk '+p.Name+'. Tersedia '+num_(p.CurrentStock)+'.');norm.push({p:p,qty:q,price:num_(i.price!==undefined?i.price:(i.harga!==undefined?i.harga:p.Price)),cost:num_(i.cost!==undefined?i.cost:p.Cost),disc:num_(i.discount!==undefined?i.discount:i.Discount),tax:num_(i.tax!==undefined?i.tax:i.Tax),sku:p.SKU});});
    var subtotal=norm.reduce(function(sum,x){return sum+x.qty*x.price;},0),disc=num_(d.discount!==undefined?d.discount:d.diskon),tax=num_(d.tax!==undefined?d.tax:d.pajak),total=d.grandTotal!==undefined?num_(d.grandTotal):Math.max(0,subtotal-disc+tax);if(total<=0)throw Error('Total transaksi harus lebih dari 0.');
    var method=String(d.paymentMethod||d.metodePembayaran||'CASH').toUpperCase();var tx={TxID:txId,Date:d.date||d.waktu||now_(),Type:d.type||'POS_PENJUALAN',PartyID:d.partyId||d.customerName||'',Description:d.description||d.desc||'Penjualan Kasir',Amount:subtotal,Status:'PENDING_AKUNTAN',CreatedBy:cashier,Cashier:cashier,Notes:d.notes||'',CompanyID:companyId2,PaymentMethod:method,QueueNo:d.queueNo||'',Tax:tax,Discount:disc,GrandTotal:total,CreatedAt:now_(),UpdatedAt:now_()};
    append_('Transactions',tx,false);norm.forEach(function(x,i){append_('TransactionItems',{ItemID:'ITEM-'+txId+'-'+(i+1),TxID:txId,SKU:x.sku,ProductID:x.p.ProductID,ProductName:x.p.Name,Qty:x.qty,UnitPrice:x.price,Cost:x.cost,Discount:x.disc,Tax:x.tax,Subtotal:x.qty*x.price-x.disc+x.tax,CompanyID:companyId2,CreatedAt:now_()},false);updateByKeys_('Products',{ProductID:x.p.ProductID,CompanyID:companyId2},{CurrentStock:num_(x.p.CurrentStock)-x.qty,UpdatedAt:now_()},false);});
    var accCode=(method==='CASH'||method==='TUNAI')?'1101':'1102';append_('Payments',{PaymentID:uid_('PAY'),Date:date_(),InvoiceID:'',TxID:txId,AccountCode:accCode,Amount:total,Method:method,ReferenceNo:d.referenceNo||'',ProcessedBy:cashier,CompanyID:companyId2,Status:'SUCCESS',CreatedAt:now_()},false);var a=getAccounts_(companyId2);updateAccount_(companyId2,accCode==='1101'?{DrawerCash:a.drawerCash+total}:{Bank:a.bank+total},false);saleJournal_(tx,norm,accCode,false);
    append_('Approvals',{ApprovalID:uid_('APR'),Date:date_(),RefType:'TRANSACTION',RefID:txId,Requester:cashier,Dept:'KASIR',Description:tx.Description,Amount:total,Status:'PENDING_AKUNTAN',ApprovalNotes:'Menunggu pemeriksaan Akuntan.',CompanyID:companyId2},false);append_('IntegrationEvents',{EventID:uid_('EVT'),CompanyID:companyId2,EventType:'TRANSACTION_CREATED',SourceRole:'KASIR',RefID:txId,Status:'PENDING_AKUNTAN',Payload:JSON.stringify({amount:total,status:'PENDING_AKUNTAN'}),CreatedAt:now_()},false);audit_(cashier,'POS_CHECKOUT',txId,companyId2,txId);rebuildSnapshot_(companyId2,'MTD');invalidateCompany_(companyId2);return{success:true,duplicate:false,id:txId,txId:txId,message:'Transaksi tersimpan di Google Sheet dan masuk antrean Akuntan per transaksi.',transaction:tx,approval:{status:'PENDING_AKUNTAN',refId:txId,companyId:companyId2},accounts:getAccounts_(companyId2)};
  }finally{lock.releaseLock();}
}

function getTransactionsHistory(companyId){
  companyId=String(companyId||'SYSTEM');var all=rows_('Transactions',false).filter(function(t){return companyId==='SYSTEM'||String(t.CompanyID)===companyId;}),cut=Date.now()-86400000,recent=[],older=[];
  all.forEach(function(t){var ts=new Date(t.CreatedAt||t.Date).getTime();if(!isNaN(ts)&&ts>=cut)recent.push(t);else older.push(t);});
  var sort=function(a,b){return String(b.CreatedAt||b.Date).localeCompare(String(a.CreatedAt||a.Date));};recent.sort(sort);older.sort(sort);var sel=recent.concat(older.slice(0,APP.MAX_ROWS)),it=rows_('TransactionItems',false);
  return sel.map(function(t){var o=txOut_(t);o.items=it.filter(function(i){return String(i.TxID)===String(t.TxID);}).map(function(i){return{sku:i.SKU,nama:i.ProductName,qty:num_(i.Qty),harga:num_(i.UnitPrice),productId:i.ProductID};});return o;});
}
function saveKasOpname(d,companyId,user){
  d=d||{};user=user||{};var c=String(user.CompanyID||companyId||d.companyId||'SYSTEM');if(c==='SYSTEM')throw Error('CompanyID Kasir tidak valid.');var cashier=String(user.Name||user.Email||d.kasir||'Kasir'),clientId=String(d.opnameId||d.OpnameID||'').trim()||uid_('OPN'),fis=num_(d.uangFisik),sys=num_(d.tunaiSystem),modal=num_(d.modalAwal);if(fis<0||sys<0||modal<0)throw Error('Nilai kas opname tidak boleh negatif.');var diff=Math.round((fis-sys)*100)/100,lock=LockService.getScriptLock();lock.waitLock(20000);
  try{var existing=rows_('KasOpname',false).find(function(x){return String(x.OpnameID)===clientId&&String(x.CompanyID)===c;});if(existing)return{success:true,duplicate:true,opnameId:clientId,opname:existing,selisih:num_(existing.Selisih),message:'Kas opname sudah tersimpan di server.'};var row={OpnameID:clientId,Waktu:d.waktu||now_(),Kasir:cashier,ModalAwal:modal,TunaiSystem:sys,UangFisik:fis,Selisih:diff,CompanyID:c,CreatedAt:now_()};append_('KasOpname',row,false);append_('Approvals',{ApprovalID:uid_('APR'),Date:date_(),RefType:'KAS_OPNAME',RefID:clientId,Requester:cashier,Dept:'KASIR',Description:'Kas Opname '+clientId,Amount:fis,Status:'PENDING_AKUNTAN',ApprovalNotes:'Menunggu pemeriksaan Akuntan.',CompanyID:c},false);append_('IntegrationEvents',{EventID:uid_('EVT'),CompanyID:c,EventType:'KAS_OPNAME_SUBMITTED',SourceRole:'KASIR',RefID:clientId,Status:'PENDING_AKUNTAN',Payload:JSON.stringify({tunaiSystem:sys,uangFisik:fis,selisih:diff}),CreatedAt:now_()},false);audit_(cashier,'KAS_OPNAME_SUBMIT','Kas opname '+clientId,c,clientId);invalidateCompany_(c);return{success:true,duplicate:false,opnameId:clientId,selisih:diff,opname:row,message:'Kas Opname berhasil disimpan ke Sheet dan dikirim ke antrean Akuntan.'};}finally{lock.releaseLock();}
}

function closeCashierShift(d){d=d||{};var cid=d.companyId||'SYSTEM',open=num_(d.openingCash),actual=num_(d.actualCash),sales=rows_('Transactions',false).filter(function(t){return String(t.CompanyID)===String(cid)&&String(t.PaymentMethod).toUpperCase()==='CASH'&&String(t.Status).toUpperCase()!=='VOID';}).reduce(function(s,t){return s+num_(t.GrandTotal);},0),exp=open+sales,r={ShiftID:uid_('SHIFT'),CompanyID:cid,CashierID:d.cashierId||'',CashierName:d.cashierName||'',StartTime:d.startTime||'',EndTime:now_(),OpeningCash:open,ExpectedCash:exp,ActualCash:actual,Difference:actual-exp,Status:'CLOSED',CreatedAt:now_(),UpdatedAt:now_()};append_('Shifts',r);return{success:true,shift:r};}

function saveMember(m,companyId,user){
  m=m||{};user=user||{};var c=String(user.CompanyID||companyId||m.companyId||m.CompanyID||'SYSTEM');if(c==='SYSTEM')throw Error('CompanyID tidak valid.');var name=String(m.name||m.Name||'').trim(),phone=String(m.phone||m.Phone||'').trim();if(!name)throw Error('Nama member wajib diisi.');var id=String(m.id||m.MemberID||'').trim()||uid_('MEM'),all=rows_('Members',false),existing=all.find(function(x){return String(x.MemberID)===id&&String(x.CompanyID)===c;});if(phone&&all.some(function(x){return String(x.CompanyID)===c&&String(x.Phone||'')===phone&&String(x.MemberID)!==id;}))throw Error('Nomor telepon member sudah terdaftar.');var r={MemberID:id,CompanyID:c,Name:name,Phone:phone,Email:String(m.email||m.Email||'').trim(),Address:String(m.address||m.Address||'').trim(),Points:num_(m.points!==undefined?m.points:m.Points),Status:String(m.status||m.Status||'ACTIVE').toUpperCase(),CreatedAt:existing&&existing.CreatedAt?existing.CreatedAt:now_(),UpdatedAt:now_()};if(existing)updateByKeys_('Members',{MemberID:id,CompanyID:c},r,false);else append_('Members',r,false);audit_(user.Name||'SYSTEM','MEMBER_SAVE','Member '+id,c,id);invalidateCompany_(c);return{success:true,duplicate:!!existing,member:r};
}

function getUsersData(companyId){return rows_('Users').filter(function(u){return companyId==='SYSTEM'||String(u.CompanyID)===String(companyId);}).map(function(u){return{id:u.UserID,nama:u.Name||u.Email,name:u.Name||u.Email,noWa:u.WhatsApp||'',role:u.Role,email:u.Email,companyId:u.CompanyID};});}
function saveMessage(m){m=m||{};var text=String(m.text||m.Text||m.pesan||'').trim();if(!text)throw Error('Pesan tidak boleh kosong.');var r={MessageID:String(m.id||m.MessageID||uid_('MSG')),CompanyID:m.companyId||m.CompanyID||'SYSTEM',SenderID:m.senderId||m.SenderID||'',SenderName:m.senderName||m.SenderName||m.pengirim||'',ReceiverID:m.receiverId||m.ReceiverID||m.roleTarget||'ALL',Text:text,Time:m.time||now_(),Status:'SENT',CreatedAt:now_()};append_('Messages',r);append_('Chats',{ID:r.MessageID,MessageID:r.MessageID,Waktu:r.Time,Pengirim:r.SenderName,SenderID:r.SenderID||'',RoleSender:m.roleSender||'',RoleTarget:m.roleTarget||r.ReceiverID,ReceiverID:r.ReceiverID,Pesan:text,CompanyID:r.CompanyID,Status:'SENT',CreatedAt:r.CreatedAt});invalidateCompany_(r.CompanyID);invalidate_('Messages');invalidate_('Chats');return{success:true,message:r};}
function getInternalChats(companyId){
  var cid=companyId||'SYSTEM';
  return rows_('Chats').filter(function(c){return cid==='SYSTEM'||String(c.CompanyID)===String(cid);}).slice(-500);
}
function getInternalChatsForUser(user){
  user=user||{};
  var cid=user.CompanyID||'SYSTEM', uid=String(user.UserID||user.id||''), role=String(user.Role||user.role||'').toUpperCase();
  return rows_('Chats').filter(function(c){
    var cc=String(c.CompanyID||'SYSTEM');
    if(cid!=='SYSTEM' && cc!==String(cid)) return false;
    var sender=String(c.SenderID||'');
    var receiver=String(c.ReceiverID||'');
    var target=String(c.RoleTarget||'').toUpperCase();
    var isAll=target==='ALL'||receiver==='ALL'||receiver==='';
    var isToMe=receiver===uid || target===uid;
    var isRole=target===role || target==='ROLE:'+role;
    var isFromMe=sender===uid;
    return isAll || isToMe || isRole || isFromMe;
  }).slice(-500);
}
function getInternalChatsForUserNoCache_(user){
  user=user||{};var cid=String(user.CompanyID||'SYSTEM'),uid=String(user.UserID||user.id||''),role=String(user.Role||user.role||'').toUpperCase();
  return rows_('Chats',false).filter(function(c){var cc=String(c.CompanyID||'SYSTEM');if(cid!=='SYSTEM'&&cc!==cid)return false;var s=String(c.SenderID||''),r=String(c.ReceiverID||''),t=String(c.RoleTarget||'').toUpperCase();return s===uid||r===uid||r==='ALL'||t==='ALL'||t===role||t==='ROLE:'+role||t===uid||t==='USER:'+uid;}).slice(-1000);
}
function sendInternalChat(p,user){
  p=p||{}; user=user||{};
  var cid=user.CompanyID||'SYSTEM', uid=String(user.UserID||user.id||''), name=user.Name||user.name||user.Email||'User', role=String(user.Role||user.role||'').toUpperCase();
  var receiverId=String(p.receiverId||p.ReceiverID||p.targetUserId||'ALL').trim()||'ALL';
  var roleTarget=String(p.roleTarget||p.RoleTarget||'').trim().toUpperCase();
  if(receiverId==='ALL' && !roleTarget) roleTarget='ALL';
  if(receiverId.indexOf('ROLE:')===0){ roleTarget=receiverId.substring(5).toUpperCase(); receiverId=''; }
  var text=String(p.pesan||p.text||p.message||'').trim();
  if(!text) throw Error('Pesan tidak boleh kosong.');
  if(receiverId!=='ALL' && receiverId!=='' && cid!=='SYSTEM'){
    var ru=rows_('Users',false).find(function(x){return String(x.UserID)===receiverId && String(x.CompanyID)===String(cid) && String(x.Status).toUpperCase()==='AKTIF';});
    if(!ru) throw Error('Penerima tidak ditemukan atau tidak aktif.');
  }
  var id=uid_('MSG'), when=now_();
  var r={MessageID:id,CompanyID:cid,SenderID:uid,SenderName:name,ReceiverID:receiverId||'ALL',Text:text,Time:when,Status:'SENT',CreatedAt:when};
  append_('Messages',r);
  append_('Chats',{ID:id,MessageID:id,Waktu:when,Pengirim:name,SenderID:uid,RoleSender:role,RoleTarget:roleTarget||receiverId||'ALL',ReceiverID:receiverId||'ALL',Pesan:text,CompanyID:cid,Status:'SENT',CreatedAt:when});
  audit_(name,'CHAT_SEND','Pesan internal ke '+(roleTarget||receiverId||'ALL'),cid,id);
  invalidateCompany_(cid); invalidate_('Messages'); invalidate_('Chats');
  return {success:true,message:r,chat:{ID:id,MessageID:id,Waktu:when,Pengirim:name,SenderID:uid,RoleSender:role,RoleTarget:roleTarget||receiverId||'ALL',ReceiverID:receiverId||'ALL',Pesan:text,CompanyID:cid,Status:'SENT',CreatedAt:when}};
}
function getBroadcastsForUser(user){
  user=user||{};
  var cid=String(user.CompanyID||'SYSTEM'), role=String(user.Role||'').toUpperCase(), uid=String(user.UserID||'');
  return rows_('Broadcasts').filter(function(b){
    if(String(b.Status||'ACTIVE').toUpperCase()!=='ACTIVE') return false;
    var target=String(b.Target||'ALL').toUpperCase();
    return target==='ALL' || target===cid.toUpperCase() || target==='COMPANY:'+cid.toUpperCase() || target===role || target==='ROLE:'+role || target===uid || target==='USER:'+uid;
  }).slice(-200).reverse();
}
function getCommunicationData(token){
  var user=requireSession_(token);
  var users=rows_('Users',false).filter(function(u){
    if(String(u.Status).toUpperCase()!=='AKTIF') return false;
    return String(user.Role).toUpperCase()==='SUPER_ADMIN' || String(u.CompanyID)===String(user.CompanyID);
  }).map(userOut_);
  return {success:true,user:userOut_(user),users:users,chats:getInternalChatsForUserNoCache_(user),broadcasts:getBroadcastsForUser(user),maintenance:getMaintenanceStatus(),serverTime:now_()};
}

function saveExpenseRecord(e,companyId){e=e||{};companyId=companyId||e.companyId||'SYSTEM';var amt=num_(e.amount||e.Amount),a=getAccounts_(companyId);if(amt<=0)throw Error('Nominal harus lebih dari 0.');if(a.pettyCash<amt)throw Error('Kas kecil tidak mencukupi.');var r={ExpenseID:uid_('EXP'),CompanyID:companyId,Date:e.date||date_(),Amount:amt,Description:e.description||e.desc||'',Category:e.category||'OPERASIONAL',CreatedBy:e.createdBy||'SYSTEM',Status:'RECORDED',CreatedAt:now_()};append_('Expenses',r);updateAccount_(companyId,{PettyCash:a.pettyCash-amt});expenseJournal_(r);rebuildSnapshot_(companyId,'MTD');invalidateCompany_(companyId);return{success:true,expense:r,accounts:getAccounts_(companyId)};}
function saveCustomerRecord(c){c=c||{};var id=c.id||c.CustomerID||uid_('CUS'),r={CustomerID:id,Name:c.name||c.Name||'',PIC:c.pic||'',Term:c.term||'',CreditLimit:num_(c.limit||c.CreditLimit),Status:c.status||'ACTIVE',CompanyID:c.companyId||c.CompanyID||'SYSTEM',Email:c.email||'',Phone:c.phone||'',Address:c.address||'',CreatedAt:c.CreatedAt||now_(),UpdatedAt:now_()};var e=rows_('Customers',false).some(function(x){return String(x.CustomerID)===String(id);});if(e)update_('Customers','CustomerID',id,r);else append_('Customers',r);invalidateCompany_(r.CompanyID);return{success:true,customer:r};}
function saveVendorRecord(v){v=v||{};var id=v.id||v.VendorID||uid_('VEN'),r={VendorID:id,Name:v.name||v.Name||'',PIC:v.pic||'',BankDetails:v.bank||v.BankDetails||'',Status:v.status||'ACTIVE',CompanyID:v.companyId||v.CompanyID||'SYSTEM',NPWP:v.npwp||'',Phone:v.phone||'',Email:v.email||'',Address:v.address||'',CreatedAt:v.CreatedAt||now_(),UpdatedAt:now_()};var e=rows_('Vendors',false).some(function(x){return String(x.VendorID)===String(id);});if(e)update_('Vendors','VendorID',id,r);else append_('Vendors',r);invalidateCompany_(r.CompanyID);return{success:true,vendor:r};}
function saveTask(t){t=t||{};var r={TaskID:t.id||t.TaskID||uid_('TASK'),Title:t.title||t.Title||'',Priority:t.priority||'MEDIUM',Deadline:t.deadline||'',Status:t.status||'OPEN',RelatedID:t.relatedId||'',Assignee:t.assignee||'',CompanyID:t.companyId||t.CompanyID||'SYSTEM',CreatedAt:t.CreatedAt||now_(),UpdatedAt:now_()};var e=rows_('Tasks',false).some(function(x){return String(x.TaskID)===String(r.TaskID);});if(e)update_('Tasks','TaskID',r.TaskID,r);else append_('Tasks',r);invalidateCompany_(r.CompanyID);return{success:true,task:r};}
function saveApproval(a){a=a||{};var r={ApprovalID:a.id||uid_('APR'),Date:a.date||date_(),RefType:a.refType||'',RefID:a.refId||'',Requester:a.requester||'',Dept:a.dept||'',Description:a.description||'',Amount:num_(a.amount),Status:a.status||'PENDING',ApprovalNotes:a.notes||'',CompanyID:a.companyId||'SYSTEM'};append_('Approvals',r);invalidateCompany_(r.CompanyID);return{success:true,approval:r};}
function saveBudget(b){b=b||{};var r={BudgetID:b.id||uid_('BDG'),Period:b.period||'MTD',Department:b.department||'',AllocatedBudget:num_(b.allocatedBudget),RealizedAmount:num_(b.realizedAmount),Notes:b.notes||'',Status:b.status||'AKTIF',CompanyID:b.companyId||'SYSTEM',CreatedAt:now_(),UpdatedAt:now_()};append_('Budgets',r);invalidateCompany_(r.CompanyID);return{success:true,budget:r};}
function saveRisk(r){r=r||{};var x={RiskID:r.id||uid_('RISK'),Date:r.date||date_(),Category:r.category||'',Description:r.description||'',ImpactLevel:r.impactLevel||'MEDIUM',MitigationPlan:r.mitigationPlan||'',Status:r.status||'OPEN',CompanyID:r.companyId||'SYSTEM',CreatedAt:now_(),UpdatedAt:now_()};append_('EnterpriseRisks',x);invalidateCompany_(x.CompanyID);return{success:true,risk:x};}
function saveReimbursement(r){r=r||{};var x={ReimbursementID:r.id||uid_('REIMB'),CompanyID:r.companyId||'SYSTEM',Requester:r.requester||'',Description:r.description||'',Amount:num_(r.amount),Status:r.status||'PENDING',ApprovedBy:r.approvedBy||'',CreatedAt:now_(),UpdatedAt:now_()};append_('Reimbursements',x);return{success:true,reimbursement:x};}

function getAdminDashboardData(payload,companyId){
  companyId=companyId||(payload&&payload.companyId)||'SYSTEM';var force=payload&&payload.forceSync===true;var key='ADMIN_'+companyId,c=force?null:cacheGet_(key);if(c)return c;
  var f=function(a){return companyId==='SYSTEM'?a:a.filter(function(x){return String(x.CompanyID)===String(companyId);});};
  var roleUser={CompanyID:companyId,Role:'ADMIN_PERUSAHAAN',UserID:''};var d={success:true,companyId:companyId,users:getUsersData(companyId),chats:getInternalChats(companyId),broadcasts:getBroadcastsForUser(roleUser),transactions:f(rows_('Transactions')).slice(-APP.MAX_ROWS).reverse().map(txOut_),tasks:f(rows_('Tasks')).slice(-APP.MAX_ROWS).reverse(),customers:f(rows_('Customers')).slice(-APP.MAX_ROWS).reverse().map(custOut_),vendors:f(rows_('Vendors')).slice(-APP.MAX_ROWS).reverse().map(vendOut_),products:f(rows_('Products')).slice(-APP.MAX_ROWS).reverse().map(prodOut_),anomalies:f(rows_('Anomalies')).slice(-APP.MAX_ROWS).reverse(),auditLogs:f(rows_('Logs')).slice(-100).reverse(),notifs:f(rows_('Notifications')).slice(-100).reverse(),accounts:getAccounts_(companyId),maintenance:getMaintenanceStatus()};
  cachePut_(key,d);return d;
}
function getAdminControlCenter(companyId,user){companyId=String(companyId||user&&user.CompanyID||'SYSTEM');var f=function(a){return companyId==='SYSTEM'?a:a.filter(function(x){return String(x.CompanyID)===companyId;});},tx=f(rows_('Transactions',false)),apps=f(rows_('Approvals',false)),tasks=f(rows_('Tasks',false)),customers=f(rows_('Customers',false)),vendors=f(rows_('Vendors',false)),products=f(rows_('Products',false)),risks=f(rows_('EnterpriseRisks',false)),an=f(rows_('Anomalies',false)),contracts=f(rows_('Contracts',false)),comp=f(rows_('ComplianceCalendar',false)),employees=f(rows_('Employees',false)),budgets=f(rows_('Budgets',false)),expenses=f(rows_('Expenses',false)),invoices=f(rows_('Invoices',false));var open=function(st){return ['DONE','COMPLETED','CLOSED','APPROVED','REJECTED'].indexOf(String(st||'').toUpperCase())<0;},sales=tx.filter(function(x){return ['VOID','CANCELLED','REJECTED'].indexOf(String(x.Status).toUpperCase())<0;}).reduce(function(s,x){return s+num_(x.GrandTotal||x.Amount);},0),exp=expenses.reduce(function(s,x){return s+num_(x.Amount);},0),ar=invoices.filter(function(x){return String(x.Type).toUpperCase()==='SALES';}).reduce(function(s,x){return s+Math.max(0,num_(x.Outstanding));},0),ap=invoices.filter(function(x){return String(x.Type).toUpperCase()==='PURCHASE';}).reduce(function(s,x){return s+Math.max(0,num_(x.Outstanding));},0),bt=budgets.reduce(function(s,x){return s+num_(x.AllocatedBudget);},0),bu=budgets.reduce(function(s,x){return s+num_(x.RealizedAmount);},0);return{success:true,companyId:companyId,serverTime:now_(),kpis:{transactions:tx.length,pendingApprovals:apps.filter(function(x){return open(x.Status);}).length,pendingKasir:tx.filter(function(x){return String(x.Status).toUpperCase()==='PENDING_AKUNTAN';}).length,sales:sales,expenses:exp,profit:sales-exp,arOutstanding:ar,apOutstanding:ap,inventoryValue:products.reduce(function(s,x){return s+num_(x.CurrentStock)*num_(x.Cost);},0),headcount:employees.length,budgetUtilization:bt?Math.round(bu/bt*100):0,openTasks:tasks.filter(function(x){return open(x.Status);}).length,openRisks:risks.filter(function(x){return open(x.Status);}).length,openAnomalies:an.filter(function(x){return open(x.Status);}).length,contractsDue:contracts.filter(function(x){var d=new Date(x.EndDate);return !isNaN(d)&&d.getTime()<=Date.now()+30*86400000&&open(x.Status);}).length,complianceDue:comp.filter(function(x){var d=new Date(x.EventDate);return !isNaN(d)&&d.getTime()<=Date.now()+30*86400000&&open(x.Status);}).length},transactions:tx.slice(-500).reverse().map(txOut_),customers:customers.slice(-500).reverse().map(custOut_),vendors:vendors.slice(-500).reverse().map(vendOut_),products:products.slice(-500).reverse().map(prodOut_),tasks:tasks.slice(-500).reverse(),approvals:apps.slice(-500).reverse(),risks:risks.slice(-500).reverse(),anomalies:an.slice(-500).reverse(),contracts:contracts.slice(-500).reverse(),compliance:comp.slice(-500).reverse(),employees:employees.slice(-500).reverse(),budgets:budgets.slice(-500).reverse(),accounts:getAccounts_(companyId),maintenance:getMaintenanceStatus()};}
function saveAdminRecord(entity,record,user){user=user||{};var c=String(user.CompanyID||'SYSTEM');if(c==='SYSTEM'&&String(user.Role).toUpperCase()!=='SUPER_ADMIN')throw Error('CompanyID tidak valid.');var map={companyprofile:'CompanyProfiles',department:'Departments',employee:'Employees',quotation:'Quotations',contract:'Contracts',servicerequest:'ServiceRequests',compliance:'ComplianceCalendar',assetrequest:'AssetRequests',policy:'Policies',approvalmatrix:'ApprovalMatrices',attendance:'Attendance',leave:'LeaveRequests',performancereview:'PerformanceReviews',warehouse:'Warehouses',fixedasset:'FixedAssets',taxrecord:'TaxRecords',fiscalperiod:'FiscalPeriods',purchaseorder:'PurchaseOrders',salesorder:'SalesOrders',stockmovement:'StockMovements',payroll:'Payroll'};var n=map[String(entity||'').toLowerCase()];if(!n)throw Error('Entity Admin tidak dikenal: '+entity);record=record||{};record.CompanyID=c;var schema=SCHEMA[n],key=schema[0],id=String(record[key]||'').trim()||uid_(String(entity||'REC').toUpperCase());record[key]=id;record.CreatedAt=record.CreatedAt||now_();record.UpdatedAt=now_();var exists=rows_(n,false).find(function(x){return String(x[key])===id&&String(x.CompanyID)===c;});if(exists)updateByKeys_(n,(function(){var o={};o[key]=id;o.CompanyID=c;return o;})(),record,false);else append_(n,record,false);audit_(user.Name||'SYSTEM','ADMIN_MASTER_SAVE',String(entity),c,id);invalidateCompany_(c);return{success:true,entity:n,record:record,mode:exists?'UPDATE':'CREATE'};}

function createTransaction(p,c){p=p||{};var cid=String(c||p.companyId||'SYSTEM');if(!cid)throw Error('CompanyID wajib diisi.');if(Array.isArray(p.items)&&p.items.length)return saveTransaction(p,cid,{CompanyID:cid,Name:p.createdBy||'Admin Perusahaan',Role:'ADMIN_PERUSAHAAN'});var txId=String(p.TxID||p.txId||p.id||'').trim()||uid_('TRX');var old=rows_('Transactions',false).find(function(x){return String(x.TxID)===txId&&String(x.CompanyID)===cid;});if(old)return{success:true,duplicate:true,txId:txId,transaction:old};var amount=num_(p.amount!==undefined?p.amount:p.GrandTotal);if(amount<=0)throw Error('Nominal transaksi harus lebih dari 0.');var status=String(p.status||'DRAFT').toUpperCase(),tx={TxID:txId,Date:p.date||date_(),Type:p.type||'OPERATIONAL',PartyID:p.partyId||'',Description:p.desc||p.description||'Transaksi Operasional',Amount:amount,Status:status,CreatedBy:p.createdBy||'Admin Perusahaan',Cashier:'',Notes:p.notes||'',CompanyID:cid,PaymentMethod:p.paymentMethod||'BANK',QueueNo:'',Tax:num_(p.tax),Discount:num_(p.discount),GrandTotal:amount,CreatedAt:now_(),UpdatedAt:now_()};append_('Transactions',tx,false);if(status==='SUBMITTED'||status==='PENDING_AKUNTAN')append_('Approvals',{ApprovalID:uid_('APR'),Date:date_(),RefType:'TRANSACTION',RefID:txId,Requester:tx.CreatedBy,Dept:'ADMIN_PERUSAHAAN',Description:tx.Description,Amount:amount,Status:status==='PENDING_AKUNTAN'?'PENDING_AKUNTAN':'PENDING',ApprovalNotes:'',CompanyID:cid},false);audit_(tx.CreatedBy,'ADMIN_TRANSACTION_CREATE',txId,cid,txId);invalidateCompany_(cid);return{success:true,duplicate:false,txId:txId,transaction:tx};}
function submitTransaction(p,c){var id=p&&(p.txId||p.id||p.TxID),cid=String(c||'SYSTEM');if(!id)throw Error('txId wajib diisi.');if(!updateByKeys_('Transactions',{TxID:id,CompanyID:cid},{Status:'SUBMITTED',UpdatedAt:now_()},false))throw Error('Transaksi tidak ditemukan.');invalidateCompany_(cid);return{success:true,txId:id};}
function resubmitTransaction(p,c){var id=p&&(p.txId||p.id||p.TxID),cid=String(c||'SYSTEM');if(!id)throw Error('txId wajib diisi.');if(!updateByKeys_('Transactions',{TxID:id,CompanyID:cid},{Status:'SUBMITTED',Notes:p.notes||'Revisi terkirim',UpdatedAt:now_()},false))throw Error('Transaksi tidak ditemukan.');invalidateCompany_(cid);return{success:true,txId:id};}

function getExecutiveDashboardData(companyId,period){
  companyId=companyId||'SYSTEM';period=period||'MTD';var key='EXEC_'+companyId+'_'+period,c=cacheGet_(key);if(c)return c;
  var s=rebuildSnapshot_(companyId,period),b=rows_('Budgets').filter(function(x){return String(x.CompanyID)===String(companyId)&&String(x.Period)===String(period);}),ap=rows_('Approvals').filter(function(x){return String(x.CompanyID)===String(companyId)&&String(x.Status).toUpperCase()==='PENDING';}),an=rows_('Anomalies').filter(function(x){return String(x.CompanyID)===String(companyId)&&['OPEN','PENDING'].indexOf(String(x.Status).toUpperCase())>=0;}),ris=rows_('EnterpriseRisks').filter(function(x){return String(x.CompanyID)===String(companyId);}),sp=rows_('StrategicPlans').filter(function(x){return String(x.CompanyID)===String(companyId);}),cogs=calcCOGS_(companyId);
  var d={success:true,companyId:companyId,users:getUsersData(companyId),chats:getInternalChats(companyId),broadcasts:getBroadcastsForUser({CompanyID:companyId,Role:'MANAJEMEN_PUNCAK',UserID:''}),period:period,serverTime:now_(),users:getUsersData(companyId),chats:[],broadcasts:[],revenue:num_(s.Revenue),expense:num_(s.Expense),netProfit:num_(s.Revenue)-num_(s.Expense),saldoKas:num_(s.Cash),saldoBank:num_(s.Bank),totalPiutang:num_(s.Receivables),totalHutang:num_(s.Payables),assets:num_(s.Assets),equity:num_(s.Equity),growthPct:0,targetProgress:budgetProgress_(b),sdm:{departments:b.map(function(x){return{name:x.Department||'Umum',budget:num_(x.AllocatedBudget),expense:num_(x.RealizedAmount)};})},pendingApprovals:ap,anomalies:an,initiatives:sp.map(function(x){return{name:x.InitiativeName,leader:x.PIC,progress:num_(x.ProgressPct),status:x.Status,budget:'Rp '+num_(x.TotalBudget).toLocaleString('id-ID')};}),macro:[],esg:[],risks:ris,transactions:rows_('Transactions').filter(function(x){return String(x.CompanyID)===String(companyId);}).slice(-1000).reverse(),expenses:rows_('Expenses').filter(function(x){return String(x.CompanyID)===String(companyId);}).slice(-500).reverse(),ratios:ratios_(s.Revenue,s.Expense,cogs),maintenance:getMaintenanceStatus()};cachePut_(key,d);return d;
}
function generateExecutiveJSON(companyId){
  var r=getExecutiveDashboardData(companyId||'SYSTEM','MTD'),rp=function(n){n=num_(n);if(n>=1e9)return'Rp '+(n/1e9).toFixed(2)+' M';if(n>=1e6)return'Rp '+(n/1e6).toFixed(1)+' Jt';return'Rp '+n.toLocaleString('id-ID');};
  return{announcement:{show:r.maintenance.isUnderMaintenance||!!r.maintenance.noticeText,message:r.maintenance.noticeText||'',level:r.maintenance.isUnderMaintenance?'critical':'info'},aiSummary:{title:'Data Kinerja Real-Time Unit: '+companyId,desc:'Ringkasan dihitung dari database transaksi dan keuangan.',healthScore:r.netProfit>0?92.5:65},metrics:{revenueMtd:rp(r.revenue),revenueGrowth:'+'+r.growthPct+'%',revenueProgress:r.targetProgress,netProfitMargin:r.revenue?((r.netProfit/r.revenue)*100).toFixed(1)+' %':'0 %',ebitda:rp(r.netProfit*1.2),cashBalance:rp(r.saldoKas+r.saldoBank),cashRunway:r.expense?(((r.saldoKas+r.saldoBank)/r.expense).toFixed(1)+' Bulan'):'Aman',opexRatio:r.revenue?((r.expense/r.revenue)*100).toFixed(1)+' %':'0 %'},divisions:r.sdm.departments.map(function(x){return{name:x.name,budget:rp(x.budget),spent:rp(x.expense),pct:x.budget?Math.round(x.expense/x.budget*100):0};}),approvals:r.pendingApprovals.map(function(a){return{id:a.ApprovalID,title:a.Description||a.RefType,requester:a.Requester||'-',amount:rp(a.Amount),urgency:num_(a.Amount)>=1e8?'HIGH':'MEDIUM',desc:'Persetujuan '+(a.RefType||'-')};}),anomalies:r.anomalies.map(function(a){return{title:a.Type,level:a.Severity||'MEDIUM',desc:a.Description};}),strategicInitiatives:r.initiatives,macroEconomics:r.macro,esgMetrics:r.esg,enterpriseRisks:r.risks};
}
function getExecutiveDataJSONString(c){return JSON.stringify(generateExecutiveJSON(c));}
function handleExecutiveApproval(id,status,companyId,notes){update_('Approvals','ApprovalID',id,{Status:String(status).toUpperCase(),ApprovalNotes:notes||''});invalidateCompany_(companyId||'SYSTEM');return true;}
function sendDirective(p,c){p=p||{};var r={DirectiveID:uid_('DIR'),CompanyID:c||p.companyId||'SYSTEM',Recipient:p.recipient||'ALL',Message:p.message||p.text||'',Sender:'MANAJEMEN_PUNCAK',Status:'SENT',CreatedAt:now_()};append_('Directives',r);saveMessage({companyId:r.CompanyID,senderName:r.Sender,receiverId:r.Recipient,text:r.Message,roleSender:r.Sender,roleTarget:r.Recipient});return{success:true,directive:r};}

function rebuildSnapshot_(companyId,period){
  var tx=rows_('Transactions',false).filter(function(x){return String(x.CompanyID)===String(companyId);}),ex=rows_('Expenses',false).filter(function(x){return String(x.CompanyID)===String(companyId);}),a=getAccounts_(companyId),cogs=calcCOGS_(companyId),rec=rows_('Invoices',false).filter(function(x){return String(x.CompanyID)===String(companyId);}).reduce(function(s,x){return s+Math.max(0,num_(x.Outstanding));},0),pay=rows_('Invoices',false).filter(function(x){return String(x.CompanyID)===String(companyId)&&String(x.Type).toUpperCase()==='PURCHASE';}).reduce(function(s,x){return s+Math.max(0,num_(x.Outstanding));},0);
  var revenue=tx.filter(function(x){return ['POS_PENJUALAN','PENJUALAN','SALES'].indexOf(String(x.Type).toUpperCase())>=0&&['VOID','CANCELLED','REJECTED'].indexOf(String(x.Status).toUpperCase())<0;}).reduce(function(s,x){return s+num_(x.GrandTotal||x.Amount);},0),expense=ex.reduce(function(s,x){return s+num_(x.Amount);},0),assets=a.drawerCash+a.bank+a.pettyCash+inventoryValue_(companyId)+rec,equity=assets-pay,row={Period:period,CompanyID:companyId,Revenue:revenue,Expense:expense,Cash:a.drawerCash,Bank:a.bank,Receivables:rec,Payables:pay,Assets:assets,Equity:equity,LastUpdated:now_()};
  var sh=getOrCreateSheet('FinancialSnapshots'),v=sh.getDataRange().getValues(),h=v[0].map(String),cp=h.indexOf('Period'),cc=h.indexOf('CompanyID'),found=-1;for(var i=1;i<v.length;i++)if(String(v[i][cp])===String(period)&&String(v[i][cc])===String(companyId)){found=i+1;break;}if(found<0)append_('FinancialSnapshots',row);else sh.getRange(found,1,1,h.length).setValues([h.map(function(k){return row[k]===undefined?'':row[k];})]);invalidate_('FinancialSnapshots');return row;
}
function calcCOGS_(cid){return rows_('TransactionItems').filter(function(i){return String(i.CompanyID)===String(cid);}).reduce(function(s,i){return s+num_(i.Cost)*num_(i.Qty);},0);}
function inventoryValue_(cid){return rows_('Products').filter(function(p){return String(p.CompanyID)===String(cid);}).reduce(function(s,p){return s+num_(p.CurrentStock)*num_(p.Cost);},0);}
function budgetProgress_(b){var al=b.reduce(function(s,x){return s+num_(x.AllocatedBudget);},0),u=b.reduce(function(s,x){return s+num_(x.RealizedAmount);},0);return al?Math.min(100,Math.round(u/al*100)):0;}
function ratios_(r,e,c){r=num_(r);e=num_(e);c=num_(c);return{grossMargin:r?(r-c)/r:0,netMargin:r?(r-c-e)/r:0,expenseRatio:r?e/r:0,cogsRatio:r?c/r:0};}

function ensureAccount_(cid){if(!rows_('Accounts',false).some(function(x){return String(x.CompanyID)===String(cid);}))append_('Accounts',{AccountID:uid_('ACC'),CompanyID:cid,DrawerCash:0,Bank:0,PettyCash:0,UpdatedAt:now_()});}
function getAccounts_(cid){cid=cid||'SYSTEM';ensureAccount_(cid);var a=rows_('Accounts',false).find(function(x){return String(x.CompanyID)===String(cid);})||rows_('Accounts',false).find(function(x){return x.CompanyID==='SYSTEM';});return{accountId:a?a.AccountID:'',drawerCash:a?num_(a.DrawerCash):0,bank:a?num_(a.Bank):0,pettyCash:a?num_(a.PettyCash):0};}
function updateAccount_(cid,p,doInvalidate){ensureAccount_(cid);var a=rows_('Accounts',false).find(function(x){return String(x.CompanyID)===String(cid);});update_('Accounts','AccountID',a.AccountID,{DrawerCash:p.DrawerCash!==undefined?num_(p.DrawerCash):num_(a.DrawerCash),Bank:p.Bank!==undefined?num_(p.Bank):num_(a.Bank),PettyCash:p.PettyCash!==undefined?num_(p.PettyCash):num_(a.PettyCash),UpdatedAt:now_()},doInvalidate);}
function saleJournal_(tx,it,acc,doInvalidate){
  var total=num_(tx.GrandTotal),add=function(code,name,de,cr,desc){append_('Journals',{JournalID:uid_('JRN'),Date:tx.Date,RefID:tx.TxID,AccountCode:code,AccountName:name,Debit:de,Credit:cr,Description:desc,CreatedBy:tx.CreatedBy,CompanyID:tx.CompanyID,SourceType:'SALE',CreatedAt:now_()},doInvalidate);};
  add(acc,acc==='1101'?'Kas Laci':'Bank',total,0,'Penerimaan '+tx.TxID);add('4101','Penjualan',0,total,'Penjualan '+tx.TxID);var c=it.reduce(function(s,x){return s+x.cost*x.qty;},0);if(c){add('5101','Harga Pokok Penjualan',c,0,'HPP '+tx.TxID);add('1301','Persediaan',0,c,'Persediaan '+tx.TxID);}
}
function expenseJournal_(e){append_('Journals',{JournalID:uid_('JRN'),Date:e.Date,RefID:e.ExpenseID,AccountCode:'6101',AccountName:e.Category,Debit:num_(e.Amount),Credit:0,Description:e.Description,CreatedBy:e.CreatedBy,CompanyID:e.CompanyID,SourceType:'EXPENSE',CreatedAt:now_()});append_('Journals',{JournalID:uid_('JRN'),Date:e.Date,RefID:e.ExpenseID,AccountCode:'1103',AccountName:'Kas Kecil',Debit:0,Credit:num_(e.Amount),Description:e.Description,CreatedBy:e.CreatedBy,CompanyID:e.CompanyID,SourceType:'EXPENSE',CreatedAt:now_()});}

function upsertSetting_(k,v){var x=rows_('Settings',false).find(function(s){return s.Key===k;});if(x)update_('Settings','Key',k,{Value:v,UpdatedAt:now_()});else append_('Settings',{Key:k,Value:v,Description:'',UpdatedAt:now_()});}
function revoke_(email){rows_('Sessions',false).filter(function(s){return normEmail_(s.Email)===normEmail_(email);}).forEach(function(s){update_('Sessions','Token',s.Token,{Status:'REVOKED'});});}
function audit_(actor,action,details,company,record){try{append_('Logs',{LogID:uid_('LOG'),Timestamp:now_(),Actor:actor||'SYSTEM',CompanyID:company||'SYSTEM',Action:action||'INFO',Details:details||''});append_('AuditLogs',{LogID:uid_('AUD'),Timestamp:now_(),Actor:actor||'SYSTEM',CompanyID:company||'SYSTEM',Action:action||'INFO',RecordID:record||'',Details:details||''});}catch(_){}}
function userOut_(u){return{id:u.UserID,UserID:u.UserID,name:u.Name,Name:u.Name,email:u.Email,Email:u.Email,wa:u.WhatsApp||'',WhatsApp:u.WhatsApp||'',role:u.Role,Role:u.Role,companyId:u.CompanyID||'-',CompanyID:u.CompanyID||'-',status:u.Status,Status:u.Status,lastLogin:u.LastLogin||''};}
function prodOut_(p){return{id:p.ProductID,ProductID:p.ProductID,sku:p.SKU,SKU:p.SKU,name:p.Name,Name:p.Name,category:p.Category,Category:p.Category,cost:num_(p.Cost),price:num_(p.Price),stock:num_(p.CurrentStock),currentStock:num_(p.CurrentStock),CurrentStock:num_(p.CurrentStock),minStock:num_(p.MinStock),maxStock:num_(p.MaxStock),unit:p.Unit||'pcs',icon:p.Icon||'📦',status:p.Status||'AKTIF',companyId:p.CompanyID,CompanyID:p.CompanyID};}
function txOut_(t){return{id:t.TxID,TxID:t.TxID,date:t.Date,waktu:t.Date,type:t.Type,desc:t.Description,description:t.Description,amount:num_(t.Amount),subtotal:num_(t.Amount),grandTotal:num_(t.GrandTotal||t.Amount),status:t.Status,createdBy:t.CreatedBy,cashier:t.Cashier||t.CreatedBy,kasir:t.Cashier||t.CreatedBy,customerName:t.PartyID||'',paymentMethod:t.PaymentMethod||'CASH',metodePembayaran:t.PaymentMethod||'CASH',queueNo:t.QueueNo||'',tax:num_(t.Tax),pajak:num_(t.Tax),discount:num_(t.Discount),diskon:num_(t.Discount),notes:t.Notes||'',companyId:t.CompanyID};}
function custOut_(c){return{id:c.CustomerID,name:c.Name,pic:c.PIC,term:c.Term,limit:num_(c.CreditLimit),status:c.Status,companyId:c.CompanyID};}
function vendOut_(v){return{id:v.VendorID,name:v.Name,pic:v.PIC,bank:v.BankDetails,status:v.Status,companyId:v.CompanyID};}
function route_(r){r=String(r||'').toUpperCase().replace(/\s+/g,'');return{SUPER_ADMIN:'Superadmin',SUPERADMIN:'Superadmin',ADMIN_PERUSAHAAN:'Adminperusahaan',ADMINPERUSAHAAN:'Adminperusahaan',AKUNTAN:'Akuntan',KASIR:'Kasir',MANAJEMEN_PUNCAK:'Manajemenpuncak',MANAJEMENPUNCAK:'Manajemenpuncak'}[r]||null;}
function hash_(p){var b=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(p),Utilities.Charset.UTF_8);return b.map(function(x){x=x<0?x+256:x;return('0'+x.toString(16)).slice(-2);}).join('');}
function verify_(p,s){s=String(s||'');return /^[a-f0-9]{64}$/i.test(s)?s.toLowerCase()===hash_(p).toLowerCase():s===String(p);}
function normEmail_(x){return String(x||'').trim().toLowerCase();}
function num_(x){if(typeof x==='number')return isNaN(x)?0:x;var n=Number(String(x==null?'':x).replace(/[^\d.-]/g,''));return isNaN(n)?0:n;}
function now_(){return Utilities.formatDate(new Date(),APP.TZ,'yyyy-MM-dd HH:mm:ss');}
function date_(){return Utilities.formatDate(new Date(),APP.TZ,'yyyy-MM-dd');}
function uid_(p){return p+'-'+Date.now()+'-'+Math.floor(Math.random()*1e6);}
function randomPass_(){var c='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$',s='';for(var i=0;i<10;i++)s+=c.charAt(Math.floor(Math.random()*c.length));return s;}
function cell_(v){return v instanceof Date?Utilities.formatDate(v,APP.TZ,'yyyy-MM-dd HH:mm:ss'):v;}
function csv_(a){if(!a||!a.length)return'';var h=Object.keys(a[0]);return[h.join(',')].concat(a.map(function(o){return h.map(function(k){return'"'+String(o[k]==null?'':o[k]).replace(/"/g,'""')+'"';}).join(',');})).join('\n');}
function html_(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function out_(d){return ContentService.createTextOutput(JSON.stringify(d)).setMimeType(ContentService.MimeType.JSON);}


// ========================= ERP INTEGRATION LAYER =========================
const ROLE_RULES = {
  SUPER_ADMIN:['*'],
  ADMIN_PERUSAHAAN:['getSyncState','dashboard','syncWorkspaceData','getAdminDashboardData','getAdminControlCenter','saveAdminRecord','createTransaction','submitTransaction','resubmitTransaction','saveExpenseRecord','saveCustomerRecord','saveVendorRecord','saveTask','saveApproval','saveBudget','saveRisk','saveReimbursement','saveProduct','saveMember','getCompanyInitialData','getProductsData','getTransactionsHistory','saveKasOpname','closeCashierShift','getUsersData','getInternalChats','sendInternalChat','getCommunicationData','getErpOverview','getMasterData','saveMasterRecord'],
  KASIR:['getSyncState','getCompanyInitialData','getProductsData','getCashierRealtimeSnapshot','saveTransaction','syncWorkspaceData','verifyTransactionFlow','getTransactionsHistory','saveKasOpname','closeCashierShift','saveMember','saveMessage','getInternalChats','sendInternalChat','getUsersData','saveProduct','getMaintenanceStatus','getCommunicationData','getErpOverview'],
  AKUNTAN:['getSyncState','getCompanyInitialData','syncWorkspaceData','verifyTransactionFlow','getTransactionsHistory','getAccountantData','syncCashierAccountingQueue','getProductsData','getProductsData','saveApproval','handleKasirApproval','saveCoaRecord','deleteCoaRecord','saveJournalEntry','getErpOverview','getMasterData','getInternalChats','sendInternalChat','getCommunicationData','getAccountantAdvancedData','saveAdjustingJournal','saveBankReconciliation','runAccountantAnomalyScan','closeAccountingPeriod','calculateDepreciation'],
  MANAJEMEN_PUNCAK:['getSyncState','getExecutiveDashboardData','syncWorkspaceData','getExecutiveDataJSONString','handleExecutiveApproval','sendDirective','getErpOverview','getMasterData','getInternalChats','sendInternalChat','getCommunicationData']
};
function requireSession_(token, allowedRoles){
  var u=getSessionUser(token);
  if(!u) throw Error('Sesi tidak valid atau sudah kedaluwarsa. Silakan login kembali.');
  var roles=allowedRoles||['SUPER_ADMIN','ADMIN_PERUSAHAAN','KASIR','AKUNTAN','MANAJEMEN_PUNCAK'];
  if(roles.indexOf('*')<0 && roles.indexOf(String(u.Role).toUpperCase())<0) throw Error('Akses ditolak untuk role '+u.Role+'.');
  return u;
}
function dispatchRoleAction_(action,payload,user){
  payload=payload||{};
  if(action==='getSyncState') return getSyncStateForUser(user);
  var companyId=user.CompanyID||payload.companyId||'SYSTEM';
  if(action==='getCompanyInitialData') return getCompanyInitialData(companyId);
  if(action==='getAdminDashboardData') return getAdminDashboardData(payload,companyId);
  if(action==='getAdminControlCenter') return getAdminControlCenter(companyId,user);
  if(action==='getExecutiveDashboardData') return getExecutiveDashboardData(companyId,payload.period||'MTD');
  if(action==='getErpOverview') return getErpOverview(companyId);
  if(action==='getCashierRealtimeSnapshot') return getCashierRealtimeSnapshot(user);
  if(action==='getMasterData') return getMasterData(companyId);
  if(action==='getAccountantAdvancedData') return getAccountantAdvancedData(companyId);
  if(action==='syncCashierAccountingQueue') return syncCashierAccountingQueue(companyId);
  if(action==='saveAdjustingJournal') return saveAdjustingJournal(payload,companyId,user);
  if(action==='saveBankReconciliation') return saveBankReconciliation(payload,companyId,user);
  if(action==='runAccountantAnomalyScan') return runAccountantAnomalyScan(companyId,user);
  if(action==='closeAccountingPeriod') return closeAccountingPeriod(payload,companyId,user);
  if(action==='calculateDepreciation') return calculateDepreciation(companyId,payload,user);
  if(action==='handleKasirApproval') return handleKasirApproval(payload,user);
  if(action==='saveCoaRecord') return saveCoaRecord(payload,companyId,user);
  if(action==='deleteCoaRecord') return deleteCoaRecord(payload,companyId,user);
  if(action==='saveJournalEntry') return saveJournalEntry(payload,companyId,user);
  if(action==='getInternalChats') return getInternalChatsForUser(user);
  if(action==='sendInternalChat') return sendInternalChat(payload,user);
  if(action==='getCommunicationData') return {success:true,user:userOut_(user),users:rows_('Users',false).filter(function(u){return String(u.Status).toUpperCase()==='AKTIF'&&(String(user.Role).toUpperCase()==='SUPER_ADMIN'||String(u.CompanyID)===String(user.CompanyID));}).map(userOut_),chats:getInternalChatsForUser(user),broadcasts:getBroadcastsForUser(user),maintenance:getMaintenanceStatus(),serverTime:now_()};
  if(action==='saveProduct') {payload.companyId=companyId; return saveProduct(payload);}
  if(action==='saveAdminRecord') {if(['ADMIN_PERUSAHAAN','SUPER_ADMIN'].indexOf(String(user.Role).toUpperCase())<0) throw Error('Akses Admin Record ditolak.'); return saveAdminRecord(payload.entity,payload.record,user);}
  if(action==='saveMember') {return saveMember(payload,companyId,user);}
  if(action==='saveMessage') {payload.companyId=companyId; return saveMessage(payload);}
  if(action==='saveTransaction') return saveTransaction(payload,companyId,user);
  if(action==='saveKasOpname') return saveKasOpname(payload,companyId,user);
  if(action==='saveExpenseRecord') return saveExpenseRecord(payload,companyId);
  if(action==='saveCustomerRecord') {payload.companyId=companyId; return saveCustomerRecord(payload);}
  if(action==='saveVendorRecord') {payload.companyId=companyId; return saveVendorRecord(payload);}
  if(action==='saveTask') {payload.companyId=companyId; return saveTask(payload);}
  if(action==='saveApproval') {payload.companyId=companyId; return saveApproval(payload);}
  if(action==='saveBudget') {payload.companyId=companyId; return saveBudget(payload);}
  if(action==='saveRisk') {payload.companyId=companyId; return saveRisk(payload);}
  if(action==='saveReimbursement') {payload.companyId=companyId; return saveReimbursement(payload);}
  if(action==='createTransaction') return createTransaction(payload,companyId);
  if(action==='submitTransaction') return submitTransaction(payload,companyId);
  if(action==='resubmitTransaction') return resubmitTransaction(payload,companyId);
  if(action==='getTransactionsHistory') return getTransactionsHistory(companyId);
  if(action==='getProductsData') return getProductsData(companyId);
  if(action==='getUsersData') return getUsersData(companyId);
  if(action==='closeCashierShift') return closeCashierShift(Object.assign({},payload,{companyId:companyId}));
  if(action==='getMaintenanceStatus') return getMaintenanceStatus();
  if(action==='syncWorkspaceData') return syncWorkspaceData(user);
  if(action==='verifyTransactionFlow') return verifyTransactionFlow(payload,user);
  throw Error('Action ERP tidak dikenal: '+action);
}

function getCashierRealtimeSnapshot(user){
  user=user||{};var c=String(user.CompanyID||'SYSTEM');var products=rows_('Products',false).filter(function(x){return c==='SYSTEM'||String(x.CompanyID)===c;}).filter(function(x){return String(x.Status||'').toUpperCase()!=='INACTIVE';}).map(prodOut_);
  var history=getTransactionsHistory(c),members=rows_('Members',false).filter(function(x){return c==='SYSTEM'||String(x.CompanyID)===c;}).slice(-1000),chats=getInternalChatsForUserNoCache_(user);
  return{success:true,serverTime:now_(),companyId:c,products:products,history:history,members:members,accounts:getAccounts_(c),users:getUsersData(c),chats:chats,communication:{chats:chats,broadcasts:getBroadcastsForUser(user)},maintenance:getMaintenanceStatus()};
}
function syncWorkspaceData(user){
  user=user||{};var role=String(user.Role||'').toUpperCase(),c=user.CompanyID||'SYSTEM',data={};
  if(role==='SUPER_ADMIN') data=getAllData();
  else if(role==='ADMIN_PERUSAHAAN') data=getAdminDashboardData({forceSync:true},c);
  else if(role==='KASIR') data=getCompanyInitialData(c);
  else if(role==='AKUNTAN') data=getAccountantData(c);
  else if(role==='MANAJEMEN_PUNCAK') data=getExecutiveDashboardData(c,'MTD');
  return {success:true,role:role,companyId:c,serverTime:now_(),data:data,communication:{chats:getInternalChatsForUser(user),broadcasts:getBroadcastsForUser(user)},maintenance:getMaintenanceStatus()};
}
function verifyTransactionFlow(p,user){
  p=p||{};user=user||{};var id=String(p.txId||p.id||p.TxID||'').trim();if(!id)throw Error('txId wajib diisi.');
  var c=user.CompanyID||'SYSTEM';var tx=rows_('Transactions',false).find(function(x){return String(x.TxID)===id && (c==='SYSTEM'||String(x.CompanyID)===String(c));});
  if(!tx) return {success:false,found:false,txId:id};
  var approval=rows_('Approvals',false).filter(function(a){return String(a.RefID)===id && (c==='SYSTEM'||String(a.CompanyID)===String(c));}).slice(-1)[0]||null;
  return {success:true,found:true,txId:id,status:String(tx.Status||''),companyId:tx.CompanyID,approval:approval,transaction:txOut_(tx),serverTime:now_()};
}
function apiCall(action,payload,token){
  var preview=payload||{};
  if(action==='loginUser') return loginUser(preview.email,preview.password);
  var user=requireSession_(token);
  var rules=ROLE_RULES[String(user.Role).toUpperCase()]||[];
  if(rules.indexOf('*')<0 && rules.indexOf(action)<0) throw Error('Aksi '+action+' tidak diizinkan untuk role '+user.Role+'.');
  var mt=getMaintenanceStatus(), role=String(user.Role||'').toUpperCase();
  var maintenanceSafe=['getSyncState','getMaintenanceStatus','getCommunicationData','getInternalChats','getErpOverview','getMasterData','getProductsData','getTransactionsHistory','getUsersData','getCompanyInitialData','getAccountantData','getExecutiveDashboardData','getExecutiveDataJSONString','getAdminDashboardData'];
  if(mt.isUnderMaintenance && role!=='SUPER_ADMIN' && maintenanceSafe.indexOf(action)<0){ throw Error('Sistem sedang dalam maintenance. Operasional sementara dikunci oleh Super Admin.'); }
  return dispatchRoleAction_(action,preview,user);
}
function getIntegratedBootstrap(token,page){
  var user=requireSession_(token);
  var cid=user.CompanyID||'SYSTEM';
  var role=String(user.Role).toUpperCase();
  var payload={success:true,page:page||'',user:userOut_({UserID:user.id||user.UserID,Email:user.email||user.Email,Name:user.name||user.Name,WhatsApp:user.WhatsApp||user.wa,Role:role,CompanyID:cid,Status:user.status||user.Status}),companyId:cid,maintenance:getMaintenanceStatus(),serverTime:now_()};
  payload.permissions=ROLE_RULES[role]||[];
  if(role==='SUPER_ADMIN') payload.data=getAllData();
  else if(role==='ADMIN_PERUSAHAAN') payload.data=getAdminDashboardData({},cid);
  else if(role==='KASIR') payload.data=getCompanyInitialData(cid);
  else if(role==='AKUNTAN') payload.data=getAccountantData(cid);
  else if(role==='MANAJEMEN_PUNCAK') payload.data=getExecutiveDashboardData(cid,'MTD');
  return payload;
}
function getAccountantData(companyId){
  companyId=String(companyId||'SYSTEM');
  // IMPORTANT: accounting queue must be server-authoritative.
  // Bypass cache for the transaction/approval/journal reads so a newly submitted cashier transaction is visible immediately.
  var txRows=rows_('Transactions',false).filter(function(x){return companyId==='SYSTEM'||String(x.CompanyID)===companyId;});
  var itemRows=rows_('TransactionItems',false).filter(function(x){return companyId==='SYSTEM'||String(x.CompanyID)===companyId;});
  var approvalRows=rows_('Approvals',false).filter(function(x){return companyId==='SYSTEM'||String(x.CompanyID)===companyId;});
  var journalRows=rows_('Journals',false).filter(function(x){return companyId==='SYSTEM'||String(x.CompanyID)===companyId;});
  var pendingIds={};
  approvalRows.forEach(function(a){
    var st=String(a.Status||'').toUpperCase();
    if(['PENDING_AKUNTAN','PENDING','SUBMITTED','UNDER REVIEW','NEED REVISION'].indexOf(st)>=0 && a.RefType==='TRANSACTION') pendingIds[String(a.RefID)]=true;
  });
  var pending=txRows.filter(function(t){
    var st=String(t.Status||'').toUpperCase();
    return (st==='PENDING_AKUNTAN'||st==='SUBMITTED'||st==='UNDER REVIEW'||st==='NEED REVISION') || pendingIds[String(t.TxID)]===true;
  }).slice(-APP.MAX_ROWS).reverse().map(function(t){
    var o=txOut_(t);
    o.sourceRole='KASIR';
    o.items=itemRows.filter(function(i){return String(i.TxID)===String(t.TxID);}).map(function(i){return {sku:i.SKU,productId:i.ProductID,name:i.ProductName,qty:num_(i.Qty),unitPrice:num_(i.UnitPrice),subtotal:num_(i.Subtotal)};});
    o.entries=journalRows.filter(function(j){return String(j.RefID)===String(t.TxID);}).map(function(j){return {coaCode:j.AccountCode,debit:num_(j.Debit),credit:num_(j.Credit),accountName:j.AccountName};});
    o.approval=approvalRows.filter(function(a){return String(a.RefID)===String(t.TxID);}).slice(-1)[0]||null;
    return o;
  });
  var coa=rows_('ChartOfAccounts',false).filter(function(x){return String(x.CompanyID)===companyId||String(x.CompanyID)==='SYSTEM';});
  return {success:true,companyId:companyId,users:getUsersData(companyId),chats:getInternalChats(companyId),broadcasts:getBroadcastsForUser({CompanyID:companyId,Role:'AKUNTAN',UserID:''}),transactions:pending,coa:coa.map(function(x){return {code:x.AccountCode,name:x.AccountName,category:x.Type,normal:x.NormalBalance,initial:num_(x.Balance),isSystem:String(x.CompanyID)==='SYSTEM'};}),journals:journalRows.slice(-1000).reverse(),approvals:approvalRows.slice(-500).reverse(),maintenance:getMaintenanceStatus(),accounts:getAccounts_(companyId),serverTime:now_(),syncMode:'DIRECT_SHEET'};
}

function syncCashierAccountingQueue(companyId){
  companyId=String(companyId||'SYSTEM');

  var txRows=rows_('Transactions',false).filter(function(t){
    return companyId==='SYSTEM'||String(t.CompanyID)===companyId;
  });
  var itemRows=rows_('TransactionItems',false).filter(function(i){
    return companyId==='SYSTEM'||String(i.CompanyID)===companyId;
  });
  var approvalRows=rows_('Approvals',false).filter(function(a){
    return companyId==='SYSTEM'||String(a.CompanyID)===companyId;
  });

  var pending=[];
  txRows.forEach(function(t){
    var txStatus=String(t.Status||'').toUpperCase();
    var ap=approvalRows.filter(function(a){
      return String(a.RefType||'').toUpperCase()==='TRANSACTION' &&
             String(a.RefID)===String(t.TxID);
    }).slice(-1)[0]||null;

    var apStatus=String(ap&&ap.Status||'').toUpperCase();

    if(
      txStatus==='PENDING_AKUNTAN' ||
      apStatus==='PENDING_AKUNTAN' ||
      apStatus==='PENDING' ||
      apStatus==='NEED REVISION' ||
      apStatus==='UNDER REVIEW'
    ){
      var o=txOut_(t);
      o.sourceRole='KASIR';
      o.queueStatus='PENDING_AKUNTAN';
      o.items=itemRows.filter(function(i){
        return String(i.TxID)===String(t.TxID);
      }).map(function(i){
        return {
          sku:i.SKU,
          productId:i.ProductID,
          name:i.ProductName,
          qty:num_(i.Qty),
          unitPrice:num_(i.UnitPrice),
          subtotal:num_(i.Subtotal)
        };
      });
      o.approval=ap;
      pending.push(o);
    }
  });

  pending.sort(function(a,b){
    return String(b.date).localeCompare(String(a.date));
  });

  return {
    success:true,
    companyId:companyId,
    serverTime:now_(),
    count:pending.length,
    transactions:pending
  };
}

function handleKasirApproval(p,user){
  var id=p.id||p.txId||p.RefID;if(!id) throw Error('ID transaksi wajib diisi.');
  var status=String(p.status||'').toUpperCase();
  if(['APPROVED','REJECTED','REVISION','NEED REVISION'].indexOf(status)<0) throw Error('Status approval tidak valid.');
  var tx=rows_('Transactions',false).find(function(x){return String(x.TxID)===String(id)&&String(x.CompanyID)===String(user.CompanyID);});
  if(!tx) throw Error('Transaksi tidak ditemukan pada perusahaan aktif.');
  var finalStatus=status==='REVISION'?'NEED REVISION':status;
  update_('Transactions','TxID',id,{Status:finalStatus,Notes:p.notes||('Diperbarui oleh Akuntan pada '+now_()),UpdatedAt:now_()});
  rows_('Approvals',false).filter(function(a){return String(a.RefID)===String(id)&&String(a.CompanyID)===String(user.CompanyID)&&['PENDING','PENDING_AKUNTAN'].indexOf(String(a.Status).toUpperCase())>=0;}).forEach(function(a){update_('Approvals','ApprovalID',a.ApprovalID,{Status:finalStatus,ApprovalNotes:p.notes||'',});});
  if(finalStatus==='APPROVED') append_('IntegrationEvents',{EventID:uid_('EVT'),CompanyID:user.CompanyID,EventType:'TRANSACTION_APPROVED',SourceRole:'AKUNTAN',RefID:id,Status:'POSTED',Payload:'{}',CreatedAt:now_()});
  audit_(user.Name,'KASIR_APPROVAL',finalStatus,user.CompanyID,id);invalidateCompany_(user.CompanyID);
  return {success:true,txId:id,status:finalStatus,transaction:txOut_(tx)};
}
function saveCoaRecord(p,c,user){p=p||{};if(p.record&&typeof p.record==='object')p=p.record;if(p.payload&&typeof p.payload==='object')p=p.payload;if(p.data&&typeof p.data==='object')p=p.data;c=String(user&&user.CompanyID||c||'SYSTEM');if(c==='SYSTEM')throw Error('CompanyID tidak valid.');var code=String(p.code||p.Code||p.accountCode||p.AccountCode||'').trim(),name=String(p.name||p.Name||p.accountName||p.AccountName||'').trim();if(!code)throw Error('Kode akun wajib diisi. Payload COA tidak mengandung code/AccountCode.');if(!name)throw Error('Nama akun wajib diisi.');var type=String(p.category||p.Type||'ASET').toUpperCase(),normal=String(p.normal||p.NormalBalance||'DEBIT').toUpperCase();if(['ASET','LIABILITAS','EKUITAS','PENDAPATAN','BEBAN'].indexOf(type)<0)throw Error('Tipe akun tidak valid: '+type);if(['DEBIT','KREDIT'].indexOf(normal)<0)throw Error('Normal balance tidak valid: '+normal);var bal=num_(p.balance!==undefined?p.balance:(p.Balance!==undefined?p.Balance:(p.initial!==undefined?p.initial:p.Initial))),all=rows_('ChartOfAccounts',false),existing=all.find(function(x){return String(x.AccountCode).trim()===code&&String(x.CompanyID)===c;}),r={AccountCode:code,AccountName:name,Type:type,NormalBalance:normal,Balance:bal,Active:(p.active===false||String(p.active).toUpperCase()==='FALSE'||String(p.Active).toUpperCase()==='FALSE')?'FALSE':'TRUE',CompanyID:c,CreatedAt:existing&&existing.CreatedAt?existing.CreatedAt:now_(),UpdatedAt:now_()};if(existing)updateByKeys_('ChartOfAccounts',{AccountCode:code,CompanyID:c},r,false);else append_('ChartOfAccounts',r,false);audit_(user&&user.Name||'SYSTEM',existing?'COA_UPDATE':'COA_CREATE',code,c,code);invalidateCompany_(c);return{success:true,mode:existing?'UPDATE':'CREATE',coa:r};}

function deleteCoaRecord(p,c,user){var code=String((p&&p.code)||'').trim();if(!code)throw Error('Kode akun wajib diisi.');if(['1101','1102','1103','1201','1301','2101','3101','4101','5101','6101','6102'].indexOf(code)>=0)throw Error('Akun sistem inti tidak dapat dihapus.');var used=rows_('Journals',false).some(function(x){return String(x.CompanyID)===String(c)&&String(x.AccountCode)===code;});if(used)throw Error('Akun tidak dapat dihapus karena sudah memiliki histori jurnal.');del_('ChartOfAccounts','AccountCode',code);audit_(user.Name,'COA_DELETE',code,c,code);invalidateCompany_(c);return {success:true,code:code};}
function saveJournalEntry(p,c,user){p=p||{};c=String(c||'SYSTEM');if(c==='SYSTEM')throw Error('CompanyID tidak valid.');var entries=Array.isArray(p.entries)?p.entries:[];if(entries.length<2)throw Error('Minimal dua baris jurnal.');var debit=0,credit=0;entries.forEach(function(e){var d=num_(e.debit),cr=num_(e.credit);if(d<0||cr<0)throw Error('Nilai debit/kredit tidak boleh negatif.');if(d>0&&cr>0)throw Error('Satu baris jurnal tidak boleh berisi debit dan kredit sekaligus.');debit+=d;credit+=cr;});if(Math.round((debit-credit)*100)/100!==0)throw Error('Jurnal tidak seimbang.');var ref=String(p.refId||'').trim()||uid_('JRNREF');if(rows_('Journals',false).some(function(x){return String(x.RefID)===ref&&String(x.CompanyID)===c;}))throw Error('Referensi jurnal '+ref+' sudah digunakan.');var dt=p.date||date_(),desc=p.description||'Jurnal Manual';entries.forEach(function(e){var code=String(e.coaCode||e.AccountCode||'').trim();if(!code)throw Error('Setiap baris jurnal wajib memiliki kode akun.');append_('Journals',{JournalID:uid_('JRN'),Date:dt,RefID:ref,AccountCode:code,AccountName:e.accountName||e.AccountName||'',Debit:num_(e.debit),Credit:num_(e.credit),Description:desc,CreatedBy:user.Name,CompanyID:c,SourceType:'MANUAL',CreatedAt:now_()},false);});append_('IntegrationEvents',{EventID:uid_('EVT'),CompanyID:c,EventType:'JOURNAL_POSTED',SourceRole:'AKUNTAN',RefID:ref,Status:'POSTED',Payload:JSON.stringify({debit:debit,credit:credit}),CreatedAt:now_()},false);audit_(user.Name,'JOURNAL_POST',ref,c,ref);invalidateCompany_(c);return{success:true,refId:ref,totalDebit:debit,totalCredit:credit};}

function accountantDate_(d){
  if(!d) return date_();
  var x=new Date(d); if(isNaN(x.getTime())) throw Error('Tanggal tidak valid: '+d);
  return Utilities.formatDate(x,APP.TZ,'yyyy-MM-dd');
}
function getAccountantAdvancedData(companyId){
  companyId=companyId||'SYSTEM';
  var tx=rows_('Transactions').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var journals=rows_('Journals').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var invoices=rows_('Invoices').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var payments=rows_('Payments').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var budgets=rows_('Budgets').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var assets=rows_('FixedAssets').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var taxes=rows_('TaxRecords').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var recon=rows_('BankReconciliations').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var periods=rows_('FiscalPeriods').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var anomalies=rows_('Anomalies').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var approvals=rows_('Approvals').filter(function(x){return String(x.CompanyID)===String(companyId);});
  var openApprovals=approvals.filter(function(a){return ['PENDING','PENDING_AKUNTAN','NEED REVISION'].indexOf(String(a.Status).toUpperCase())>=0;});
  var pendingTx=tx.filter(function(t){return ['PENDING_AKUNTAN','SUBMITTED','NEED REVISION'].indexOf(String(t.Status).toUpperCase())>=0;});
  var approvedTx=tx.filter(function(t){return String(t.Status).toUpperCase()==='APPROVED';});
  var debit=0,credit=0;
  journals.forEach(function(j){debit+=num_(j.Debit);credit+=num_(j.Credit);});
  var outstandingAR=invoices.filter(function(i){return String(i.Type).toUpperCase()==='AR';}).reduce(function(s,i){return s+num_(i.Outstanding);},0);
  var outstandingAP=invoices.filter(function(i){return String(i.Type).toUpperCase()==='AP';}).reduce(function(s,i){return s+num_(i.Outstanding);},0);
  var taxOpen=taxes.filter(function(t){return ['PAID','SETTLED','CLOSED'].indexOf(String(t.Status).toUpperCase())<0;}).reduce(function(s,t){return s+num_(t.TaxAmount);},0);
  var budgetsTotal=budgets.reduce(function(s,b){return s+num_(b.AllocatedBudget);},0);
  var realizedTotal=budgets.reduce(function(s,b){return s+num_(b.RealizedAmount);},0);
  return {success:true,companyId:companyId,serverTime:now_(),kpis:{journalCount:journals.length,transactionCount:tx.length,pendingApprovals:openApprovals.length,pendingCashier:pendingTx.filter(function(t){return String(t.Cashier||'')!=='';}).length,arOutstanding:outstandingAR,apOutstanding:outstandingAP,taxOpen:taxOpen,bankReconOpen:recon.filter(function(r){return String(r.Status).toUpperCase()!=='MATCHED';}).length,unresolvedAnomalies:anomalies.filter(function(a){return ['RESOLVED','CLOSED'].indexOf(String(a.Status).toUpperCase())<0;}).length,budgetUtilization:budgetsTotal?Math.round(realizedTotal/budgetsTotal*10000)/100:0,trialBalanceDifference:Math.round((debit-credit)*100)/100},periods:periods.slice(-24).reverse(),reconciliations:recon.slice(-100).reverse(),assets:assets.slice(-200).reverse(),taxes:taxes.slice(-200).reverse(),anomalies:anomalies.slice(-200).reverse(),approvals:openApprovals.slice(-200).reverse(),recentTransactions:tx.slice(-200).reverse(),budgets:budgets.slice(-200).reverse()};
}
function validateEntries_(entries){
  if(!Array.isArray(entries)||entries.length<2) throw Error('Minimal dua baris jurnal.');
  var d=0,c=0;
  entries.forEach(function(e){var db=num_(e.debit),cr=num_(e.credit);if(db<0||cr<0)throw Error('Debit/kredit tidak boleh negatif.');if(db>0&&cr>0)throw Error('Satu baris tidak boleh debit dan kredit sekaligus.');if(!e.coaCode&&!e.AccountCode)throw Error('COA wajib dipilih.');d+=db;c+=cr;});
  if(Math.abs(d-c)>0.005) throw Error('Jurnal tidak seimbang: debit '+d+' vs kredit '+c+'.');
  return {debit:d,credit:c};
}
function saveAdjustingJournal(p,c,user){
  p=p||{}; var check=validateEntries_(p.entries), ref=p.refId||uid_('ADJ'), dt=accountantDate_(p.date), desc=p.description||'Adjusting Journal';
  p.entries.forEach(function(e){append_('Journals',{JournalID:uid_('JRN'),Date:dt,RefID:ref,AccountCode:e.coaCode||e.AccountCode,AccountName:e.accountName||e.AccountName||'',Debit:num_(e.debit),Credit:num_(e.credit),Description:desc,CreatedBy:user.Name,CompanyID:c,SourceType:'ADJUSTING',CreatedAt:now_()});});
  var approvalId=uid_('APR');append_('Approvals',{ApprovalID:approvalId,Date:dt,RefType:'ADJUSTING_JOURNAL',RefID:ref,Requester:user.Name,Dept:'ACCOUNTING',Description:desc,Amount:check.debit,Status:'PENDING_ADMIN',ApprovalNotes:'Menunggu review Admin Perusahaan.',CompanyID:c});
  append_('IntegrationEvents',{EventID:uid_('EVT'),CompanyID:c,EventType:'ADJUSTING_JOURNAL_CREATED',SourceRole:'AKUNTAN',RefID:ref,Status:'PENDING_ADMIN',Payload:JSON.stringify(check),CreatedAt:now_()});
  audit_(user.Name,'ADJUSTING_JOURNAL_CREATE',ref,c,ref);invalidateCompany_(c);return{success:true,refId:ref,approvalId:approvalId,totalDebit:check.debit,totalCredit:check.credit};
}
function saveBankReconciliation(p,c,user){
  p=p||{};var period=String(p.period||date_()).trim(),book=num_(p.bookBalance),bank=num_(p.bankBalance),diff=Math.round((book-bank)*100)/100,id=p.reconId||uid_('RECON'),status=Math.abs(diff)<=0.01?'MATCHED':'UNMATCHED';
  var r={ReconID:id,CompanyID:c,Period:period,AccountCode:p.accountCode||'1102',BookBalance:book,BankBalance:bank,Difference:diff,Status:status,Notes:p.notes||'',CreatedAt:p.CreatedAt||now_(),UpdatedAt:now_()};
  append_('BankReconciliations',r);audit_(user.Name,'BANK_RECONCILIATION',id,c,id);invalidateCompany_(c);return{success:true,reconciliation:r};
}
function runAccountantAnomalyScan(c,user){
  c=c||user.CompanyID;var created=0,now=now_();
  var tx=rows_('Transactions').filter(function(x){return String(x.CompanyID)===String(c);});
  var byRef={}; tx.forEach(function(t){var k=String(t.Type)+'|'+String(t.Description)+'|'+String(t.GrandTotal||t.Amount)+'|'+String(t.Date);byRef[k]=(byRef[k]||[]).concat([t]);});
  Object.keys(byRef).forEach(function(k){if(byRef[k].length>1){byRef[k].forEach(function(t){var exists=rows_('Anomalies',false).some(function(a){return String(a.RefID)===String(t.TxID)&&String(a.Type)==='POTENTIAL_DUPLICATE';});if(!exists){append_('Anomalies',{AnomalyID:uid_('ANM'),RefID:t.TxID,Type:'POTENTIAL_DUPLICATE',Description:'Potensi transaksi duplikat berdasarkan tanggal, uraian dan nilai.',Clarification:'Periksa dokumen sumber dan nomor bukti.',Severity:'MEDIUM',Status:'OPEN',CompanyID:c,CreatedAt:now,UpdatedAt:now});created++;}});}});
  tx.forEach(function(t){if(num_(t.GrandTotal||t.Amount)<0){append_('Anomalies',{AnomalyID:uid_('ANM'),RefID:t.TxID,Type:'NEGATIVE_AMOUNT',Description:'Nilai transaksi negatif.',Clarification:'Periksa sumber transaksi.',Severity:'HIGH',Status:'OPEN',CompanyID:c,CreatedAt:now,UpdatedAt:now});created++;}});
  audit_(user.Name,'ACCOUNTING_ANOMALY_SCAN','SCAN',c,String(created));invalidateCompany_(c);return{success:true,created:created};
}
function closeAccountingPeriod(p,c,user){
  p=p||{};var period=String(p.period||'').trim();if(!period)throw Error('Periode wajib diisi.');
  var data=getAccountantAdvancedData(c);if(Math.abs(num_(data.kpis.trialBalanceDifference))>0.01)throw Error('Periode belum bisa ditutup: Trial Balance tidak seimbang.');
  if(data.kpis.pendingApprovals>0)throw Error('Periode belum bisa ditutup: masih ada approval pending.');
  if(data.kpis.unresolvedAnomalies>0)throw Error('Periode belum bisa ditutup: masih ada anomaly terbuka.');
  var existing=rows_('FiscalPeriods',false).find(function(x){return String(x.CompanyID)===String(c)&&String(x.Period)===period;});
  var r={PeriodID:existing?existing.PeriodID:uid_('PERIOD'),CompanyID:c,Period:period,StartDate:p.startDate||period+'-01',EndDate:p.endDate||period+'-31',Status:'CLOSED',ClosedBy:user.Name,ClosedAt:now_()};
  if(existing)update_('FiscalPeriods','PeriodID',existing.PeriodID,r);else append_('FiscalPeriods',r);
  audit_(user.Name,'ACCOUNTING_PERIOD_CLOSE',period,c,period);invalidateCompany_(c);return{success:true,period:r};
}
function calculateDepreciation(c,p,user){
  p=p||{};var period=String(p.period||Utilities.formatDate(new Date(),APP.TZ,'yyyy-MM')).slice(0,7),assets=rows_('FixedAssets',false).filter(function(a){return String(a.CompanyID)===String(c)&&String(a.Status).toUpperCase()!=='DISPOSED';}),items=[],total=0;
  assets.forEach(function(a){var cost=num_(a.AcquisitionCost),life=Math.max(1,num_(a.UsefulLifeMonths)),monthly=cost/life,acc=num_(a.AccumulatedDepreciation),book=Math.max(0,cost-acc),dep=Math.min(monthly,book);if(dep>0){items.push({AssetID:a.AssetID,AssetName:a.AssetName,Depreciation:Math.round(dep*100)/100,BookValueAfter:Math.round((book-dep)*100)/100});total+=dep;}});
  return{success:true,period:period,totalDepreciation:Math.round(total*100)/100,items:items};
}

function getErpOverview(companyId){
  companyId=companyId||'SYSTEM';var f=function(a){return companyId==='SYSTEM'?a:a.filter(function(x){return String(x.CompanyID)===String(companyId);});};
  var tx=f(rows_('Transactions')), approved=tx.filter(function(x){return String(x.Status).toUpperCase()==='APPROVED';});
  return {success:true,companyId:companyId,serverTime:now_(),kpis:{transactions:tx.length,approvedTransactions:approved.length,products:f(rows_('Products')).length,customers:f(rows_('Customers')).length,vendors:f(rows_('Vendors')).length,pendingApprovals:f(rows_('Approvals')).filter(function(x){return ['PENDING','PENDING_AKUNTAN'].indexOf(String(x.Status).toUpperCase())>=0;}).length,openAnomalies:f(rows_('Anomalies')).filter(function(x){return ['OPEN','PENDING'].indexOf(String(x.Status).toUpperCase())>=0;}).length,employees:f(rows_('Employees')).length,openTasks:f(rows_('Tasks')).filter(function(x){return ['DONE','COMPLETED'].indexOf(String(x.Status).toUpperCase())<0;}).length},accounts:getAccounts_(companyId),maintenance:getMaintenanceStatus(),recentEvents:f(rows_('IntegrationEvents')).slice(-100).reverse()};
}
function getMasterData(companyId){companyId=companyId||'SYSTEM';var f=function(a){return companyId==='SYSTEM'?a:a.filter(function(x){return String(x.CompanyID)===String(companyId);});};return {success:true,products:f(rows_('Products')).map(prodOut_),customers:f(rows_('Customers')).map(custOut_),vendors:f(rows_('Vendors')).map(vendOut_),employees:f(rows_('Employees')),departments:f(rows_('Departments')),warehouses:f(rows_('Warehouses')),fixedAssets:f(rows_('FixedAssets')),taxRecords:f(rows_('TaxRecords')),fiscalPeriods:f(rows_('FiscalPeriods'))};}
function saveMasterRecord(entity,p,user){
  var map={'employee':'Employees','department':'Departments','warehouse':'Warehouses','fixedasset':'FixedAssets','taxrecord':'TaxRecords','fiscalperiod':'FiscalPeriods','purchaseorder':'PurchaseOrders','salesorder':'SalesOrders','stockmovement':'StockMovements','payroll':'Payroll'};
  var n=map[String(entity||'').toLowerCase()];if(!n)throw Error('Master entity tidak dikenal.');p=p||{};p.CompanyID=user.CompanyID;var schema=SCHEMA[n];var idKey=schema[0], id=p[idKey]||uid_(String(entity).toUpperCase());p[idKey]=id;p.CreatedAt=p.CreatedAt||now_();p.UpdatedAt=now_();var exists=rows_(n,false).some(function(x){return String(x[idKey])===String(id)&&String(x.CompanyID)===String(user.CompanyID);});if(exists)update_(n,idKey,id,p);else append_(n,p);audit_(user.Name,'MASTER_SAVE',entity,user.CompanyID,id);invalidateCompany_(user.CompanyID);return {success:true,entity:n,record:p};}

function handleApiRequest(action,p,b){var payload=b||p||{},a=action||payload.action||payload.api,publicActions=['loginUser','RegisterUser','requestResetOTP','verifyResetOTP','saveNewPassword','triggerPendingEmail','getScriptUrl','pingSystem','testConnection'];if(publicActions.indexOf(a)>=0){if(a==='loginUser')return loginUser(payload.email,payload.password);if(a==='RegisterUser')return RegisterUser(payload.formData||payload);if(a==='requestResetOTP')return requestResetOTP(payload.email);if(a==='verifyResetOTP')return verifyResetOTP(payload.email,payload.otp);if(a==='saveNewPassword')return saveNewPassword(payload.email,payload.otp,payload.newPassword);if(a==='triggerPendingEmail')return triggerPendingEmail(payload.email);if(a==='getScriptUrl')return getScriptUrl();if(a==='pingSystem')return pingSystem();if(a==='testConnection')return testConnection();}var token=payload.token||(payload.payload&&payload.payload.token);if(!token)throw Error('Token session wajib untuk endpoint ERP.');return apiCall(payload.action||a,payload.payload||payload,token);}

/* Alias kompatibilitas */
function getProductsDataLegacy(c){return getProductsData(c);}
function saveTransactionLegacy(d,c){return saveTransaction(d,c);}
function saveKasOpnameLegacy(d,c){return saveKasOpname(d,c);}
function testConnection(){return{status:'ok',spreadsheetId:getDB().getId(),time:now_()};}
function pingSystem(){return{status:'ok',time:Date.now()};}
function pancingSemuaIzin(){getDB();MailApp.getRemainingDailyQuota();CacheService.getScriptCache();ScriptApp.getService().getUrl();return true;}
