# FlowGenie Testing Guide

## Complete User Journey Testing

### Test Scenario 1: New User Registration and Agent Creation

**Steps:**
1. Navigate to `http://localhost:3002`
2. Click "Get Started" button
3. Register with email: `test@example.com`, password: `password123`
4. Verify redirect to dashboard
5. Click "Create New Agent"
6. Fill in form:
   - Name: "Test Trading Agent"
   - Description: "My first AI trading agent"
   - Strategy: "Buy undervalued NBA Top Shot moments under $50"
7. Click "Create Agent"
8. Verify success toast notification
9. Verify agent appears in dashboard

**Expected Results:**
- ✅ Registration successful
- ✅ User logged in with JWT token
- ✅ Dashboard loads with demo agents
- ✅ Agent creation form validates inputs
- ✅ New agent created and displayed
- ✅ Success notification shown

### Test Scenario 2: Marketplace Browsing

**Steps:**
1. Navigate to "Marketplace" from navigation
2. Search for "NBA"
3. Filter by category "NBA Top Shot"
4. Sort by "Rating"
5. Click on featured agent
6. Review agent details
7. Click "Preview" button

**Expected Results:**
- ✅ Marketplace loads with agents
- ✅ Search filters results correctly
- ✅ Category filter works
- ✅ Sorting updates display
- ✅ Agent cards display properly

### Test Scenario 3: Authentication Flow

**Steps:**
1. Click "Logout" (if logged in)
2. Navigate to `/login`
3. Try logging in with wrong credentials
4. Verify error message
5. Login with correct credentials
6. Verify dashboard access
7. Check user menu displays email
8. Test "Connect Wallet" button

**Expected Results:**
- ✅ Login page displays correctly
- ✅ Invalid credentials show error
- ✅ Valid credentials redirect to dashboard
- ✅ User session persists on refresh
- ✅ Wallet connection initiates

### Test Scenario 4: Agent Management

**Steps:**
1. Go to dashboard
2. Click pause on an active agent
3. Verify status changes to "paused"
4. Click play to resume
5. Click "View Details"
6. Click "Analytics"
7. Click "Share" button

**Expected Results:**
- ✅ Agent status toggles correctly
- ✅ UI updates immediately
- ✅ Action buttons are functional
- ✅ Agent state persists

### Test Scenario 5: Analytics Dashboard

**Steps:**
1. Navigate to "Analytics"
2. Change time range to "7 Days"
3. Filter by specific agent
4. Review performance charts
5. Check agent performance table
6. Test export functionality

**Expected Results:**
- ✅ Analytics page loads
- ✅ Filters work correctly
- ✅ Charts display properly
- ✅ Data updates based on filters
- ✅ Table shows all agents

## API Testing

### Backend Health Check
```bash
curl http://localhost:3001/health
```

**Expected:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-05T...",
  "service": "FlowGenie Backend API",
  "version": "1.0.0"
}
```

### User Registration
```bash
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Expected:**
- Status: 201
- Returns user object and JWT token

### Agent Creation
```bash
TOKEN="your_jwt_token_here"
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name":"Test Agent",
    "description":"A test agent",
    "prompt":"Buy NBA moments under $50"
  }'
```

**Expected:**
- Status: 201
- Returns created agent object

### Get User Agents
```bash
curl http://localhost:3001/api/agents \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:**
- Status: 200
- Returns array of user's agents

## Frontend Testing

### Component Testing

**Test Components:**
- Header navigation
- Hero section
- Agent cards
- Marketplace filters
- Login/Register forms
- Create agent modal
- Toast notifications
- Loading states
- Error boundaries

### Responsive Testing

**Breakpoints to test:**
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

**Features to test:**
- ✅ Navigation menu (mobile hamburger)
- ✅ Agent cards (stacking)
- ✅ Forms (full width on mobile)
- ✅ Tables (horizontal scroll)
- ✅ Charts (responsive sizing)

### Browser Testing

**Test browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Testing

**Metrics to check:**
- Page load time < 3s
- Time to interactive < 5s
- First contentful paint < 1.5s
- Lighthouse score > 90

## Integration Testing

### Flow Blockchain Integration

**Test Cases:**
1. Wallet connection
2. Transaction signing
3. Balance fetching
4. NFT querying
5. Smart contract calls

### OpenAI Integration

**Test Cases:**
1. Natural language parsing
2. Command generation
3. Response formatting
4. Error handling
5. Fallback to demo mode

## Load Testing

### Backend Load Test
```bash
# Using Apache Bench
ab -n 1000 -c 100 http://localhost:3001/health

# Using curl in loop
for i in {1..100}; do
  curl http://localhost:3001/api/marketplace/nba-topshot &
done
wait
```

### Expected Performance
- Handle 100 concurrent requests
- Response time < 200ms
- No memory leaks
- Graceful degradation

## Security Testing

### Authentication Tests
- ✅ JWT token validation
- ✅ Expired token handling
- ✅ Invalid token rejection
- ✅ Password hashing
- ✅ XSS protection
- ✅ CSRF protection

### Authorization Tests
- ✅ User can only access own agents
- ✅ Protected routes require auth
- ✅ API endpoints validate permissions
- ✅ Wallet operations verify ownership

## Error Handling Tests

### Network Errors
- Test with backend offline
- Test with slow network
- Test with failed requests
- Test with timeout

### Input Validation
- Empty form submissions
- Invalid email formats
- Weak passwords
- SQL injection attempts
- XSS attempts

### Edge Cases
- Very long agent names
- Special characters in inputs
- Concurrent agent creation
- Rapid status toggling
- Large dataset pagination

## Accessibility Testing

### WCAG 2.1 Compliance
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast ratios
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ ARIA labels

### Test with:
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard only navigation
- Browser zoom (200%, 400%)
- High contrast mode

## Automated Testing

### Unit Tests
```bash
# Run unit tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### E2E Tests (Planned)
```bash
# Using Playwright
npx playwright test

# Using Cypress
npx cypress run
```

## Smoke Testing Checklist

Before each deployment:

- [ ] Homepage loads without errors
- [ ] Login/Register works
- [ ] Dashboard displays agents
- [ ] Create agent functionality works
- [ ] Marketplace loads and filters work
- [ ] Analytics page renders
- [ ] Profile settings accessible
- [ ] Navigation links all work
- [ ] API health check passes
- [ ] Error boundaries catch errors
- [ ] Toast notifications appear
- [ ] Loading states display
- [ ] Mobile layout works
- [ ] Wallet connection initiates

## Bug Report Template

When reporting bugs, include:

```markdown
**Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
If applicable

**Environment:**
- Browser: Chrome 120
- OS: macOS 14
- Screen: 1920x1080
- FlowGenie Version: 1.0.0

**Console Errors:**
Any errors from browser console

**Additional Context:**
Any other relevant information
```

## Test Results Log

### Latest Test Run: 2025-10-05

| Test Case | Status | Notes |
|-----------|--------|-------|
| User Registration | ✅ Pass | Working correctly |
| User Login | ✅ Pass | JWT auth functional |
| Agent Creation | ✅ Pass | API integration works |
| Dashboard Load | ✅ Pass | Demo data displays |
| Marketplace | ✅ Pass | Filtering works |
| Analytics | ✅ Pass | Charts render |
| Profile | ✅ Pass | Settings update |
| Wallet Connect | ✅ Pass | Mock connection works |
| Error Handling | ✅ Pass | Toast system functional |
| Loading States | ✅ Pass | Skeletons display |

---

For questions about testing, contact the development team or open an issue on GitHub.
