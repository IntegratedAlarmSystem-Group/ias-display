export const Map = {
	"placemarkers": {
		"wstations": [{
			"name": "M201",
			"opt_cx": 0.0,
			"description": "Primary WS",
			"opt_cy": 0.0
		}],
		"pads": [{
			"name": "P405",
			"opt_cx": 0.0,
			"description": "PAD",
			"opt_cy": 0.0
		}]
	},
	"relations": {
		"wstations_groups": {
			"backup": {
				"wstations": []
			},
			"primary": {
				"wstations": [{
					"name": "M201",
					"opt_cx": 0.0,
					"description": "Primary WS",
					"opt_cy": 0.0
				}, {
					"name": "M309",
					"opt_cx": 0.0,
					"description": "Primary WS",
					"opt_cy": 0.0
				}]
			}
		},
		"antenna_groups": {
			"SARM": {
				"pads": [{
					"name": "S306",
					"opt_cx": 0.0,
					"description": "PAD",
					"opt_cy": 0.0
				}]
			},
			"PARM": {
				"pads": [{
					"name": "P405",
					"opt_cx": 0.0,
					"description": "PAD",
					"opt_cy": 0.0
				}]
			},
			"MI": {
				"pads": [{
					"name": "A133",
					"opt_cx": 0.0,
					"description": "PAD",
					"opt_cy": 0.0
				}]
			},
			"WM": {
				"pads": [{
					"name": "W210",
					"opt_cx": 0.0,
					"description": "PAD",
					"opt_cy": 0.0
				}]
			}
		}
	},
	"paths": [
		[{
			"opt_cx": 0.0,
			"opt_cy": 0.0
		}, {
			"opt_cx": 0.0,
			"opt_cy": 0.0
		}, {
			"opt_cx": 0.0,
			"opt_cy": 0.0
		}, {
			"opt_cx": 0.0,
			"opt_cy": 0.0
		}]
	]
}
