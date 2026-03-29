from typing import Dict, List, Optional
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class WaterTreatmentAdvisor:
    """AI-powered guidance system for water treatment operations"""
    
    def __init__(self):
        self.thresholds = {
            'bod': {'normal': 30, 'warning': 50, 'critical': 80},
            'cod': {'normal': 250, 'warning': 400, 'critical': 600},
            'turbidity': {'normal': 5, 'warning': 10, 'critical': 15},
            'chlorine': {'normal': 0.5, 'warning': 1.0, 'critical': 2.0},
            'ph': {'min': 6.5, 'max': 8.5}
        }
        
        self.recommendations = {
            'high_bod': [
                "Increase aeration time in the biological treatment unit",
                "Check and maintain optimal dissolved oxygen levels (2-4 mg/L)",
                "Verify MLSS (Mixed Liquor Suspended Solids) concentration",
                "Consider adding biological boosters or enzymes",
                "Check for toxic influent that may be inhibiting bacterial activity"
            ],
            'high_cod': [
                "Optimize chemical dosing for coagulation and flocculation",
                "Increase retention time in secondary treatment",
                "Check for industrial waste discharge in influent",
                "Consider adding tertiary treatment processes",
                "Monitor and control oil and grease levels"
            ],
            'high_turbidity': [
                "Check and optimize coagulant dosage",
                "Verify filter backwash cycles and frequency",
                "Inspect sedimentation tank performance",
                "Check for algae growth in clarifiers",
                "Optimize mixing intensity in flocculation tanks"
            ],
            'low_chlorine': [
                "Increase chlorine dosage in disinfection unit",
                "Check chlorine contact time (minimum 30 minutes)",
                "Verify chlorine metering equipment calibration",
                "Check for chlorine demand increase in effluent",
                "Monitor chlorine residual levels throughout the system"
            ],
            'ph_imbalance': [
                "Add acid or alkali as needed to adjust pH levels",
                "Check for industrial waste discharge affecting pH",
                "Verify carbon dioxide stripping efficiency",
                "Monitor buffering capacity of the system",
                "Check for equipment corrosion affecting pH"
            ]
        }

    def analyze_water_quality(self, water_data: Dict) -> Dict:
        """Analyze water quality data and provide recommendations"""
        analysis = {
            'status': 'normal',
            'issues': [],
            'recommendations': [],
            'priority_actions': [],
            'efficiency_score': 0,
            'next_steps': []
        }

        issues_found = []
        
        # Check BOD levels
        if water_data.get('bod_level'):
            bod = water_data['bod_level']
            if bod > self.thresholds['bod']['critical']:
                issues_found.append({
                    'parameter': 'BOD',
                    'severity': 'critical',
                    'value': bod,
                    'threshold': self.thresholds['bod']['critical'],
                    'message': f'BOD level critically high at {bod:.1f} mg/L'
                })
                analysis['recommendations'].extend(self.recommendations['high_bod'][:2])
                analysis['priority_actions'].append('Immediate BOD reduction required')
            elif bod > self.thresholds['bod']['warning']:
                issues_found.append({
                    'parameter': 'BOD',
                    'severity': 'warning',
                    'value': bod,
                    'threshold': self.thresholds['bod']['warning'],
                    'message': f'BOD level elevated at {bod:.1f} mg/L'
                })
                analysis['recommendations'].extend(self.recommendations['high_bod'][:1])

        # Check COD levels
        if water_data.get('cod_level'):
            cod = water_data['cod_level']
            if cod > self.thresholds['cod']['critical']:
                issues_found.append({
                    'parameter': 'COD',
                    'severity': 'critical',
                    'value': cod,
                    'threshold': self.thresholds['cod']['critical'],
                    'message': f'COD level critically high at {cod:.1f} mg/L'
                })
                analysis['recommendations'].extend(self.recommendations['high_cod'][:2])
                analysis['priority_actions'].append('Urgent COD reduction needed')
            elif cod > self.thresholds['cod']['warning']:
                issues_found.append({
                    'parameter': 'COD',
                    'severity': 'warning',
                    'value': cod,
                    'threshold': self.thresholds['cod']['warning'],
                    'message': f'COD level elevated at {cod:.1f} mg/L'
                })
                analysis['recommendations'].extend(self.recommendations['high_cod'][:1])

        # Check Turbidity
        if water_data.get('turbidity_ntu'):
            turbidity = water_data['turbidity_ntu']
            if turbidity > self.thresholds['turbidity']['critical']:
                issues_found.append({
                    'parameter': 'Turbidity',
                    'severity': 'critical',
                    'value': turbidity,
                    'threshold': self.thresholds['turbidity']['critical'],
                    'message': f'Turbidity critically high at {turbidity:.1f} NTU'
                })
                analysis['recommendations'].extend(self.recommendations['high_turbidity'][:2])
                analysis['priority_actions'].append('Immediate filtration optimization required')
            elif turbidity > self.thresholds['turbidity']['warning']:
                issues_found.append({
                    'parameter': 'Turbidity',
                    'severity': 'warning',
                    'value': turbidity,
                    'threshold': self.thresholds['turbidity']['warning'],
                    'message': f'Turbidity elevated at {turbidity:.1f} NTU'
                })
                analysis['recommendations'].extend(self.recommendations['high_turbidity'][:1])

        # Check Chlorine levels
        if water_data.get('chlorine_level'):
            chlorine = water_data['chlorine_level']
            if chlorine < self.thresholds['chlorine']['normal']:
                issues_found.append({
                    'parameter': 'Chlorine',
                    'severity': 'warning',
                    'value': chlorine,
                    'threshold': self.thresholds['chlorine']['normal'],
                    'message': f'Chlorine level low at {chlorine:.2f} mg/L'
                })
                analysis['recommendations'].extend(self.recommendations['low_chlorine'][:1])

        # Check pH levels
        if water_data.get('ph_level'):
            ph = water_data['ph_level']
            if ph < self.thresholds['ph']['min'] or ph > self.thresholds['ph']['max']:
                issues_found.append({
                    'parameter': 'pH',
                    'severity': 'warning',
                    'value': ph,
                    'threshold': f"{self.thresholds['ph']['min']}-{self.thresholds['ph']['max']}",
                    'message': f'pH level out of range at {ph:.1f}'
                })
                analysis['recommendations'].extend(self.recommendations['ph_imbalance'][:1])

        # Calculate efficiency score
        analysis['efficiency_score'] = self._calculate_efficiency_score(water_data, issues_found)
        
        # Set overall status
        if any(issue['severity'] == 'critical' for issue in issues_found):
            analysis['status'] = 'critical'
        elif any(issue['severity'] == 'warning' for issue in issues_found):
            analysis['status'] = 'warning'
        else:
            analysis['status'] = 'normal'

        analysis['issues'] = issues_found
        
        # Generate next steps
        analysis['next_steps'] = self._generate_next_steps(water_data, issues_found)

        return analysis

    def _calculate_efficiency_score(self, water_data: Dict, issues: List) -> int:
        """Calculate overall treatment efficiency score (0-100)"""
        base_score = 100
        
        for issue in issues:
            if issue['severity'] == 'critical':
                base_score -= 30
            elif issue['severity'] == 'warning':
                base_score -= 15
        
        # Bonus for good water reuse
        if water_data.get('reused_water_mld') and water_data.get('treated_water_mld'):
            reuse_ratio = water_data['reused_water_mld'] / water_data['treated_water_mld']
            if reuse_ratio > 0.7:
                base_score += 10
            elif reuse_ratio > 0.5:
                base_score += 5
        
        return max(0, min(100, base_score))

    def _generate_next_steps(self, water_data: Dict, issues: List) -> List[str]:
        """Generate next steps for operators"""
        next_steps = []
        
        if issues:
            critical_issues = [i for i in issues if i['severity'] == 'critical']
            warning_issues = [i for i in issues if i['severity'] == 'warning']
            
            if critical_issues:
                next_steps.append("Address critical issues immediately to avoid compliance violations")
                next_steps.append("Consider temporary shutdown if critical parameters cannot be controlled")
            
            if warning_issues:
                next_steps.append("Monitor warning parameters closely for next 24 hours")
                next_steps.append("Schedule maintenance for equipment optimization")
        else:
            next_steps.append("Continue normal operation with routine monitoring")
            next_steps.append("Focus on water reuse optimization")
        
        # Add preventive maintenance suggestions
        next_steps.append("Schedule routine sensor calibration and maintenance")
        next_steps.append("Review and update operating procedures")
        
        return next_steps

    def get_operational_guidance(self, plant_data: Dict) -> Dict:
        """Get comprehensive operational guidance"""
        guidance = {
            'current_status': self.analyze_water_quality(plant_data),
            'optimization_tips': self._get_optimization_tips(plant_data),
            'maintenance_schedule': self._suggest_maintenance_schedule(plant_data),
            'cost_optimization': self._suggest_cost_optimization(plant_data),
            'compliance_status': self._check_compliance(plant_data)
        }
        
        return guidance

    def _get_optimization_tips(self, plant_data: Dict) -> List[str]:
        """Get optimization tips based on current performance"""
        tips = []
        
        # Water reuse optimization
        if plant_data.get('reused_water_mld') and plant_data.get('treated_water_mld'):
            reuse_ratio = plant_data['reused_water_mld'] / plant_data['treated_water_mld']
            if reuse_ratio < 0.5:
                tips.append("Consider implementing additional water reuse applications")
                tips.append("Explore opportunities for greywater recycling")
        
        # Energy optimization
        tips.append("Optimize pump schedules to reduce energy consumption during off-peak hours")
        tips.append("Consider variable frequency drives for energy optimization")
        
        # Chemical optimization
        tips.append("Implement automatic dosing control for chemicals")
        tips.append("Regularly review chemical consumption patterns")
        
        return tips

    def _suggest_maintenance_schedule(self, plant_data: Dict) -> Dict:
        """Suggest maintenance schedule based on current conditions"""
        schedule = {
            'daily': [
                "Check and record all sensor readings",
                "Inspect chemical dosing pumps",
                "Monitor sludge levels"
            ],
            'weekly': [
                "Calibrate critical sensors (pH, DO, turbidity)",
                "Clean filter screens and strainers",
                "Inspect and clean aerators"
            ],
            'monthly': [
                "Comprehensive equipment inspection",
                "Lubricate moving parts",
                "Test safety systems and alarms"
            ],
            'quarterly': [
                "Major equipment servicing",
                "Tank cleaning and inspection",
                "Calibrate all analytical instruments"
            ]
        }
        
        return schedule

    def _suggest_cost_optimization(self, plant_data: Dict) -> List[str]:
        """Suggest cost optimization measures"""
        tips = [
            "Implement energy-efficient equipment to reduce power costs",
            "Optimize chemical usage through automated dosing",
            "Reduce water purchase costs through increased reuse",
            "Implement predictive maintenance to reduce breakdown costs",
            "Consider solar power for non-critical operations"
        ]
        
        return tips

    def _check_compliance(self, plant_data: Dict) -> Dict:
        """Check environmental compliance status"""
        compliance = {
            'status': 'compliant',
            'violations': [],
            'recommendations': []
        }
        
        # Check against standard environmental limits
        standards = {
            'bod_limit': 30,
            'cod_limit': 250,
            'turbidity_limit': 5,
            'ph_min': 6.5,
            'ph_max': 8.5
        }
        
        if plant_data.get('bod_level', 0) > standards['bod_limit']:
            compliance['violations'].append(f"BOD exceeds limit: {plant_data['bod_level']:.1f} > {standards['bod_limit']}")
            compliance['status'] = 'non_compliant'
        
        if plant_data.get('cod_level', 0) > standards['cod_limit']:
            compliance['violations'].append(f"COD exceeds limit: {plant_data['cod_level']:.1f} > {standards['cod_limit']}")
            compliance['status'] = 'non_compliant'
        
        if plant_data.get('turbidity_ntu', 0) > standards['turbidity_limit']:
            compliance['violations'].append(f"Turbidity exceeds limit: {plant_data['turbidity_ntu']:.1f} > {standards['turbidity_limit']}")
            compliance['status'] = 'non_compliant'
        
        ph = plant_data.get('ph_level')
        if ph and (ph < standards['ph_min'] or ph > standards['ph_max']):
            compliance['violations'].append(f"pH out of range: {ph:.1f} (should be {standards['ph_min']}-{standards['ph_max']})")
            compliance['status'] = 'non_compliant'
        
        if compliance['status'] == 'non_compliant':
            compliance['recommendations'] = [
                "Immediate action required to achieve compliance",
                "Document all corrective actions taken",
                "Notify regulatory authorities if required",
                "Implement continuous monitoring until compliance is achieved"
            ]
        
        return compliance

# Global advisor instance
advisor = WaterTreatmentAdvisor()
