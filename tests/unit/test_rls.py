import pytest
from app.dependencies.rls import filter_reports_by_user, check_report_access
from app.models.user import User, UserRole
from app.models.report import Report
from unittest.mock import Mock

class TestRLS:
    
    def setup_method(self):
        self.mock_db = Mock()
    
    def test_admin_sees_all_reports(self):
        admin_user = Mock(role=UserRole.ADMIN)
        query = filter_reports_by_user(self.mock_db, admin_user)
        assert query == self.mock_db.query(Report)
    
    def test_government_sees_wilaya_reports(self):
        gov_user = Mock(role=UserRole.GOVERNMENT, wilaya="Alger")
        filter_reports_by_user(self.mock_db, gov_user)
        self.mock_db.query().filter.assert_called()
    
    def test_citizen_sees_own_reports(self):
        citizen_user = Mock(role=UserRole.CITIZEN, id=1)
        filter_reports_by_user(self.mock_db, citizen_user)
        self.mock_db.query().filter.assert_called()
    
    def test_admin_can_access_any_report(self):
        admin_user = Mock(role=UserRole.ADMIN)
        report = Mock(id=1, wilaya="Alger", user_id=2)
        self.mock_db.query().filter().first.return_value = report
        result = check_report_access(self.mock_db, 1, admin_user)
        assert result == report
    
    def test_government_can_access_same_wilaya(self):
        gov_user = Mock(role=UserRole.GOVERNMENT, wilaya="Alger")
        report = Mock(id=1, wilaya="Alger", user_id=2)
        self.mock_db.query().filter().first.return_value = report
        result = check_report_access(self.mock_db, 1, gov_user)
        assert result == report
    
    def test_government_cannot_access_other_wilaya(self):
        gov_user = Mock(role=UserRole.GOVERNMENT, wilaya="Alger")
        report = Mock(id=1, wilaya="Oran", user_id=2)
        self.mock_db.query().filter().first.return_value = report
        with pytest.raises(Exception):
            check_report_access(self.mock_db, 1, gov_user)
    
    def test_citizen_can_access_own_report(self):
        citizen_user = Mock(role=UserRole.CITIZEN, id=1)
        report = Mock(id=1, user_id=1, wilaya="Alger")
        self.mock_db.query().filter().first.return_value = report
        result = check_report_access(self.mock_db, 1, citizen_user)
        assert result == report
    
    def test_citizen_cannot_access_other_report(self):
        citizen_user = Mock(role=UserRole.CITIZEN, id=1)
        report = Mock(id=1, user_id=2, wilaya="Alger")
        self.mock_db.query().filter().first.return_value = report
        with pytest.raises(Exception):
            check_report_access(self.mock_db, 1, citizen_user)